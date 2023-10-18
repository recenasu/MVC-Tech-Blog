const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models');

// ***GET all Blogpost data***
// This route is used to return all blogposts to appear on the homepage.
router.get('/', async (req, res) => {
    try {
        // Get all blogpost data
        const blogpostData = await Blogpost.findAll();

        // Serialize data so the template can read it
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        // render the result with the homepage template
        res.render('homepage', {
            blogposts, session: req.session,
            logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ***GET Dashboard data for the logged in user***
// This route is used to return all blogposts to appear on the homepage.
router.get('/dashboard', async (req, res) => {
    try {
        // Get all blogpost data
        const blogpostData = await Blogpost.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        
        // Serialize data so the template can read it
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));

        // render the result with the homepage template
        res.render('dashboard', {
            blogposts, session: req.session,
            logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ***Render the login page***
// This route is used when the user clicks on login on the nav bar or if the user clicks on any homepage link while logged out.
router.get('/login', (req, res) => {

    res.render('login');
});


module.exports = router;