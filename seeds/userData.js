// Import User model
const { User } = require('../models');
const { bulkCreate } = require('../models/User');

// Assign seed data to variable
const userData = [
{
    name: 'Joe Schmo',
    email: 'joe@schmo.com',
    password: 'password12345',
},
{
    name: 'Jill Johnson',
    email: 'jill@johnson.com',
    password: 'password12345',
},
{
    name: 'Herb Hancock',
    email: 'herb@hancock.com',
    password: 'password12345',
},
{
    name: 'Ben Franklin',
    email: 'ben@franklin.com',
    password: 'password12345',
},
];

// Function to seed model
const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

// Export for use by other files
module.exports = seedUsers;