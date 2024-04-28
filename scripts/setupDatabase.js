const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');

async function initializeDatabase(force = false) {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Optionally force database reinitialization
        await sequelize.sync({ force: force });
        if (force) {
            console.log('Database schema has been reinitialized successfully.');
        } else {
            console.log('Database schema has been synchronized successfully.');
        }
    } catch (error) {
        console.error('Unable to connect to the database or synchronize schema:', error);
    }
}

async function createTestData(username, email, password) {
    try {
        // Make sure to call bcrypt.hash correctly
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        console.log(`Test user created successfully with ID: ${user.id}`);
    } catch (error) {
        console.error('Failed to create test data:', error);
    }
}

// Example usage:
async function run() {
    // Set to true to force reinitialization, false to just sync
    await initializeDatabase(true);
    await createTestData("admin2", "admin@gmail.com", "password2");
}

run();
