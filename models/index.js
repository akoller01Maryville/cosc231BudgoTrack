const Sequelize = require('sequelize');

const sequelize = new Sequelize('testDB', 'gnawtough', "#RoED#7R$9pK%7KFVXvBTMcPuki7a^ae", {
    host: 'localhost',
    dialect: 'mysql',
});

const User = require('./user');

module.exports = {
    User,
    sequelize,
};