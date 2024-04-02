// run to initialize database
const { sequelize, User} = require('../models');
const bcrypt = require('bcryptjs');

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

async function createTestData() {
    try {
        await sequelize.sync();

        // Create a test user with hashed password
        const hashedPassword = await bcrypt.hash('password', 10);
        await User.create({
            username: 'admin',
            password: hashedPassword,
        });

        console.log('Test user created successfully.');
    } catch (error) {
        console.error('Failed to create test data:', error);
    }
}

//change parameter to True if want to reinitialize clean database.
initializeDatabase();

createTestData();
