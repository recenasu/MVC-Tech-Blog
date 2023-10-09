// Import models from model files
const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

// Define model associations

Blogpost.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blogpost, {
    foreignKey: 'blog_id',
});

User.hasMany(Blogpost. {
    foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Blogpost, Comment };