// Import the Model and DataTypes objects from the sequelize module
const { Model, DataTypes } = require('sequelize');
// Import the 'sequelize' object for creating a model and connecting to the database.
const sequelize = require('../config/connection');

class Blogpost extends Model {};

Blogpost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        // Do not pluralize table name
        freezeTableName: true,
        // Keep table name in snake case
        underscored: true,
        modelName: 'blogpost'
    },
);

module.exports = Blogpost;