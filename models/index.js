const Sequelize = require('sequelize');

// create sequelize instance with database info
const sequelize = new Sequelize('testDB', 'gnawtough', "#RoED#7R$9pK%7KFVXvBTMcPuki7a^ae", {
    host: 'localhost',
    dialect: 'mysql',
});

//import models TODO: add all other models to this and add to exports
const User = require('./user')(sequelize, Sequelize.DataTypes);

//sequelize.sync() // moved to /scripts/setupDatabase.js
    //.then(() => console.log('Models synchronized successfully.'))
    //catch(error => console.error('Error synchronizing models:', error));

module.exports = {
    sequelize,
    User
};