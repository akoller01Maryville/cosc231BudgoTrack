// this is where all the seperate models will be imported.
const Sequelize = require('sequelize');

// create sequelize instance with database info
const sequelize = new Sequelize('testDB', 'gnawtough', "#RoED#7R$9pK%7KFVXvBTMcPuki7a^ae", {
    host: 'localhost',
    dialect: 'mysql',
});

//import models TODO: add all other models to this and add to exports
const User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = {
    sequelize,
    User
};