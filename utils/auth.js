const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route, else proceed
    if (!req.session.logged_in) {
        req.redirect('/login');
    } else {
        next();
    }
};

// Export the function for use by other files
module.exports = withAuth;