// Import the Model and Datatypes objects from the sequelize module
const { Model, DataTypes } = require('sequelize');
// Import the bcrypt module for password hash and comparison
const bcrypt = require('bcrypt');
// Import the 'sequlize' object for creating a model and connecting to the database.
const sequelize = require('../config/connection');

class User extends Model {
    // compare the login password to the stored value of the password property
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        hooks: {
            // hash the new user password before creating the new user
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // hash the user's updated password before updating the user
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        // Do not include 'createdAt' or 'updatedAt' fields in the table
        timestamps: false,
        // Do not pluralize table name
        freezeTableName: true,
        // Keep table name in snake case
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;