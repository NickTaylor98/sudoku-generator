'use strict';
const Sequelize = require('sequelize');
const config = require('./config.json');
module.exports = () => {
    const sequelize = new Sequelize(config.db, config.login, config.password, config.options);
    sequelize.authenticate().then(() => {
        console.log('Connection to database successful');
    }).catch((err) => {
        console.log('Unable to connect to database', err);
    });
    const Users = require('../models/users')(Sequelize, sequelize);
    const Statistics = require('../models/statistics')(Sequelize, sequelize);

    Users.hasOne(Statistics);
    Statistics.belongsTo(Users);

    Statistics.findAllWithSort = async () => {
        let query = `(statistics."hardWins" - statistics."easyLoses") * 3 + (statistics."mediumWins" - statistics."mediumLoses") * 2 + (statistics."easyWins" - statistics."hardLoses")`;
        if (config.options.dialect === 'mysql') query = `(hardWins - easyLoses) * 3 + (mediumWins - mediumLoses) * 2 + (easyWins - hardLoses)`;
        return await Statistics.findAll({
            attributes: [
                'hardWins', 'hardLoses', 'mediumWins',
                'mediumLoses', 'easyWins', 'easyLoses', 
                [sequelize.literal(query), 'rating']
            ],
            include: [{
                model: Users,
                required: true,
                attributes: ['login'],
                raw: true
            }],
            raw: true,
            order: [
                [sequelize.literal(query), 'DESC']
            ]
        });
    }
    return {
        users: Users,
        stats: Statistics,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};