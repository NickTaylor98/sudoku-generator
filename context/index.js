'use strict';
const Sequelize = require('sequelize');
const config = require('./config.json');
module.exports = () => {
    const sequelize = new Sequelize(config.db, config.login, config.password, {
        host: config.host,
        dialect: config.dialect,
        define: {
            timestamps: true,
            paranoid: true
        }
    });
    sequelize.authenticate().then(() => {
        console.log('Connection to database successful');
    }).catch((err) => {
        console.log('Unable to connect to database', err);
    });
    const Users = require('../models/users')(Sequelize, sequelize);
    const Statistics = require('../models/statistics')(Sequelize, sequelize);
    
    Users.hasOne(Statistics);

    return {
        users : Users,
        stats : Statistics,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};