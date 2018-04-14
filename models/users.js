module.exports = (Sequelize, sequelize) => {
    return sequelize.define('users', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Login: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        }
    })
}