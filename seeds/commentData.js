// Import Comment model
const { Comment } = require('../models');

// Assign seed data to variable
const commentData = [
    {
        id: 1,
        comment_content: 'Really good discussion.',
        user_id: 1,
        blog_id: 1,
    },
    {
        id: 2,
        comment_content: 'I do not know where to begin.',
        user_id: 1,
        blog_id: 1,
    },
    {
        id: 3,
        comment_content: 'The best.',
        user_id: 1,
        blog_id: 2,
    },
    {
        id: 4,
        comment_content: 'I want to read more.',
        user_id: 2,
        blog_id: 2,
    },
];

// Function to seed model
const seedComments = () => Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
});

// Export for use by other files
module.exports = seedComments;