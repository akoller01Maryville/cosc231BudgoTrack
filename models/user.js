const Sequelize = require('sequelize');
const sequelize = new Sequelize('testDB', 'gnawtough', '#RoED#7R$9pK%7KFVXvBTMcPuki7a^ae', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize.sync();

module.exports = User;