// Import Blogpost model
const { Blogpost } = require('../models');

// Assign seed data to variable
const blogpostData = [
    {
        id: 1,
        title: 'Function',
        content: 'A Function is a block of code that performs a specific task or calculates a value. It is a reusable piece of code that can be called or invoked from different parts of a program.',
        user_id: 1,
    },
    {
        id: 2,
        title: 'Model',
        content: 'The model represents the data and the business logic of an application. It is responsible for managing the data, performing data operations, and enforcing the business rules.',
        user_id: 2,
    },
    
];

// Function to seed model
const seedBlogposts = () => Blogpost.bulkCreate(blogpostData, {
    individualHooks: true,
    returning: true,
});

// Export for use by other files
module.exports = seedBlogposts;