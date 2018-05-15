'use strict';
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('statistics', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hardWins: {
            type: Sequelize.INTEGER
        },
        hardLoses: {
            type: Sequelize.INTEGER
        },
        mediumWins: {
            type: Sequelize.INTEGER
        },
        mediumLoses: {
            type: Sequelize.INTEGER
        },
        easyWins: {
            type: Sequelize.INTEGER
        },
        easyLoses: {
            type: Sequelize.INTEGER
        }
    }, {
        getterMethods: {
            rating: function () {
                return (this.hardWins - this.easyLoses) * 3 + (this.mediumWins - this.mediumLoses) * 2 + (this.easyWins - this.hardLoses);
            }
        }
    });
}