// run to initialize database
const { sequelize } = require('../models');


async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await sequelize.sync({ force: true }); // change to false if breaks stuff
        console.log('Database schema has been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database or synchronize schema:', error);
    }
}

//change parameter to True if want to reinitialize clean database.
initializeDatabase();
