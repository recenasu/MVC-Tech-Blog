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
                    attributes: ['name', 'id'],
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
        
        // Check if the logged in user is the same as the post user. If so set isSameUser to true. On the template side, this variable is used to show or hide specific controls, like the "Update Post" button.
        let isSameUser = false;
        if (req.session.user_id == blogpost.user_id) {
            isSameUser = true;
        }     
            console.log(isSameUser);
        

        // render the result with the blogpost template
        res.render('blogpost', {
            blogpost, comment, isSameUser, session: req.session,
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
            blogpost, session: req.session,
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

// ***GET route that returns the newPost page***
// This route is executed when the user clicks on the New Post button on the Dashboard. It returns the newPost template for the user to add a new post.
router.get('/newpost/form', async (req, res) => {
    try {
        console.log('made it here!');
        const randomNum = Math.random();
        let postEmoji;
        
        // set emoji variable to go with new post.
        if (randomNum > 0.9) {
        postEmoji = '&#128640;'
        } else if (randomNum > 0.8) {
            postEmoji = '&#128507;'
        } else if (randomNum > 0.7) {
            postEmoji = '&#128508;'
        } else if (randomNum > 0.6) {
            postEmoji = '&#128509;'
        } else if (randomNum > 0.5) {
            postEmoji = '&#128511;'
        } else if (randomNum > 0.4) {
            postEmoji = '&#128640;'
        } else if (randomNum > 0.3) {
            postEmoji = '&#128642;'
        } else if (randomNum > 0.2) {
            postEmoji = '&#128692;'
        } else if (randomNum > 0.1) {
            postEmoji = '&#128761;'
        } else if (randomNum > 0.0) {
            postEmoji = '&#129380;'
        }; 
        
        // render the result with the homepage template
        res.render('newPost', {
            postEmoji, session: req.session,
            logged_in: req.session ? req.session.logged_in : false
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ***POST route for posting a new blogpost***
// This route is executed when the user clicks on the Save Post button on the newPost page. It adds the user's post to the blogpost model tagged with the user's user_id.


module.exports = router;