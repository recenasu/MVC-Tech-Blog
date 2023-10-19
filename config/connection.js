// Import the sequalize module as the Sequelize class
const Sequelize = require('sequelize');

// Import the 'dotenv' module config() function for environment variable security
require('dotenv').config();

let sequelize;

// Create an instance of the Sequelize class for connecting to the appropriate database, remote (JAWSDB_URL) or local
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        }
    );
};

// Export the sequelize object for use by other files
module.exports = sequelize;