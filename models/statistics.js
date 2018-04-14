module.exports = (Sequelize, sequelize) => {
    return sequelize.define('statistics', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        HardWins: {
            type: Sequelize.INTEGER
        },
        HardLoses: {
            type: Sequelize.INTEGER
        },
        MediumWins: {
            type: Sequelize.INTEGER
        },
        MediumLoses: {
            type: Sequelize.INTEGER
        },
        EasyWins: {
            type: Sequelize.INTEGER
        },
        EasyLoses: {
            type: Sequelize.INTEGER
        }
    });
}