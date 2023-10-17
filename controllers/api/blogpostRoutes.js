const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// ***GET single Blogpost data***
// This route is used to return information on the blogpost selected by the user on the homepage or dashboard.
router.get('/:id', async (req, res) => {
    console.info("made it here");
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

        // Get comment data
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

        // render the result with the blogpost template
        res.render('blogpost', {
            blogpost, comment,
            logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
);

// ***GET single Blogpost data with comment entry template***
// This route is used to return information on the blogpost and the comment entry form.
router.get('/comment/:id', async (req, res) => {
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

        console.log(blogpostData);

        // Assign the queried data to plain JavaScript objects that do not contain the sequelize properties. 'blogpost' is a single object. 'comment' is an array of objects.
        const blogpost = blogpostData.get({ plain: true });
        console.log(blogpost);

        // render the result with the comment template
        res.render('comment', {
            blogpost,
            logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
);

// ***POST the received comment associated with the received blogpost id***
// This route is used when the user clicks on the Save Comment button after entering a comment on the blogpost comment entry page. It posts the new comment to the database, retrieves all comments from the database, and then returns the blogpost template.
router.post('/savecomment', async (req, res) => {
    console.log("made it here!");
    try {
        const { user_id } = req.session;
        const blog_id = req.body.blog_id;
        const comment_content = req.body.comment;

        const payload = {
            user_id,
            comment_content,
            blog_id
        };

        const newCommentData = await Comment.create(payload);
        console.log(newCommentData);
        res.status(200).json(newCommentData);

    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;