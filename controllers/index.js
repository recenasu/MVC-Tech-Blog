// Import the Router module from the express package
const router = require('express').Router();

// Import api and homeroutes
// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Requests to the root URL will be handled by homeRoutes
router.use('/', homeRoutes);
// Requests to the /api URL will be handled by apiRoutes
// router.use('/api', apiRoutes);

// Export the router module for use by other files
module.exports = router;