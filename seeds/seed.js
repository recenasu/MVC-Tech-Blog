// Import the 'sequelize' object for connecting to the database.
const sequelize = require('../config/connection');
// Import seed functions
const seedUsers = require('./userData');
const seedBlogposts = require('./blogpostData');
const seedComments = require('./commentData');

// Define function to seed all models in the database.
const seedAll = async () => {
    await sequelize.sync( {force: true });

    await seedUsers();

    await seedBlogposts();

    await seedComments();

    process.exit(0);
};

// Execute function
seedAll();