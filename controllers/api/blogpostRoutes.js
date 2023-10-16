const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// ***GET single Blogpost data***
// This route is used to return information on the blogpost selected by the user on the homepage or dashboard.
router.get('/:id', async (req, res) => {
    try {
        // Get blogpost data
        const blogpostData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        });

        // Get blogpost data
        const commentData = await Comment.findAll({
            where: {
                blog_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ]
        });

        console.log(blogpostData);
        console.log(commentData);

        // Assign the queried data to plain JavaScript objects that do not contain the sequelize properties. 'blogpost' is a single object. 'comment' is an array of objects.
        const blogpost = blogpostData.get({ plain: true });
        console.log(blogpost);

        const comment = commentData.map((comment) => comment.get({ plain: true }));
        console.log(commentData);

        // render the result with the homepage template
        res.render('blogpost', {
            blogpost, comment,
            // logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
);

module.exports = router;