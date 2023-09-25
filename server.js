// Import the path module for working with file and directory paths
const path = require('path');

// Import the express module for creating server routes
const express = require('express');

// Import the express-session module for managing user sessions
const session = require('express-session');

// Import the express-handlebars module for rendering HTML templates
const exphbs = require('express-handlebars');

// Import the routes defined in the controllers directory 
const routes = require('./controllers');

// Import the helpers file
const helpers = require('./utils/helpers');

// Import the sequelize object for connecting to the database
const sequelize = require('./config/connection'); 

// Import the SequelizeStore class for storing session data in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the 'dotenv' module config() function for environment variable security. Used in the 'sess' config variable.
require('dotenv').config();

// Assign the express() function to a variable for easy reference
const app = express();

// Define the PORT on the server that will listen for HTTP requests, checks for a defined environment variable before defaulting to 3001
const PORT = process.env.PORT || 3001; 

// Create a new instance of the Handlebars.js engine with helpers functions
const hbs = exphbs.create({ helpers });

// Create configuration object for the 'session' middleware
const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Make the 'session' object available for use, configured with 'sess' parameters
app.use(session(sess));

// Register the template engine for Express.js. Associate the file extension 'handlebars' with the Handlebars template engine (hbs.engine)
app.engine('handlebars', hbs.engine);

// Set the default view engine for Express.js
app.set('view engine', 'handlebars');

// Use express.json() middleware to parse JSON data from the request body into a JavaScript object
app.use(express.json());

// Use express.urlencoded() middleware to parse url encoded data from the request body into a Javascript object
app.use(express.urlencoded({ extended: true }));

// Use the express.static() middleware to serve static files from the 'public' directory. For the file location argument, join the current directory to the public subfolder (i.e. '/public')   
app.use(express.static(path.join(__dirname, 'public')));

// Mount the 'routes' object for use by Express.js.
app.use(routes);

// Sync the models to the database without dropping existing tables, then start the server to listen on the PORT.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Now listening');
    });
})
