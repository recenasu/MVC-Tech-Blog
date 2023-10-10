const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// ***GET all Blogpost data***
// This route is used to return all blogposts to appear on the homepage.
router.get('/', async (req, res) => {
    try {
        // Get all blogpost data
        const blogpostData = await Blogpost.findAll();
        console.log(blogpostData);

        // Serialize data so the template can read it
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        console.log(blogposts);

        // render the result with the homepage template
        res.render('homepage', {
            blogposts,
            // logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

module.exports = router;