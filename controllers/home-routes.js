const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { User, BlogPost, Comment } = require('../models');

// GET / all BlogPosts to render 'blogs'
router.get('/', async (req, res) => {
    // Get all BlogPosts and JOIN with user data
    BlogPost.findAll({
        // get authorname
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['commentbody', 'commentdate', 'user_id'],
            }
        ],
    })
        .then((blogPostsFromDB) => {
            // Serialize data so the template can read it
            let blogPosts = blogPostsFromDB.map((bp) => bp.get({ plain: true }));

            // Get comment Author username via lookup in DB 

            for (let i = 0; i < blogPosts.length; i++) {
                for (let j = 0; j < blogPosts[i].comments.length; j++) {
                    const commentAuthorId = blogPosts[i].comments[j].user_id;
                    // console.log(commentAuthorId);

                    // add commentauthor to it to comment object
                    User.findByPk(commentAuthorId, {
                        attributes: ['username'],
                    })
                        .then((commentAuthorFromDB) => {
                            const commentAuthor = commentAuthorFromDB.get({ plain: true });
                            blogPosts[i].comments[j].commentauthor = commentAuthor.username;
                        })
                        .catch((err) => console.log(err));
                }
            }

            if (blogPosts.length > 1) {
                res.render('blogs', {
                    blogPosts,
                    loggedIn: req.session.loggedIn,
                    pagetitle: "kwikBlog",
                    // more than one blog posts found
                    isOne: false,
                });
            } else {
                res.render('blogs', {
                    blogPosts,
                    loggedIn: req.session.loggedIn,
                    pagetitle: "kwikBlog",
                    // only one blog post found
                    isOne: true,
                });
            }

        })
        .catch((err) => res.status(400).json(err))
});
// GET /dashboard for User's posts
router.get('/dashboard', withAuth, async (req, res) => {
    // Get user's own BlogPosts 
    let userblogPosts = {};
    let userblogPostsFromDB = {};
    try {
        userblogPostsFromDB = await BlogPost.findAll({
            where: {
                user_id: req.session.userId
            }
        });

        if (userblogPostsFromDB) {
            userblogPosts = userblogPostsFromDB.map((bp) => bp.get({ plain: true }));

            res.render('blogs', {
                userblogPosts,
                loggedIn: req.session.loggedIn,
                pagetitle: "Your Dashboard",
                isDashboard: true,
                newPost: false,
            });

        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);
// GET /login page
router.get('/login', (req, res) => {

    // if user is already logged in
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }

    //send data to handlebars to render login form
    res.render('login', {
        pagetitle: "kwikBlog",
        formType: 'loginForm',
        boxTitle: 'Login',
        boxButtonText: 'Login!',
        boxSwapLink: '/signup',
        boxSwapLinkText: 'Sign up instead'
    });

});
// GET /signup page
router.get('/signup', (req, res) => {

    //send data to handlebars to render signpup form
    res.render('login', {
        pagetitle: "kwikBlog",
        formType: 'signupForm',
        boxTitle: 'Sign Up',
        boxButtonText: 'Sign Up!',
        boxSwapLink: '/login',
        boxSwapLinkText: 'Login instead'
    });

});
// GET /blogpost/:id page for single post
router.get('/blogposts/:id', withAuth, async (req, res) => {

    let blogPost = {};
    let postAuthor = {};
    let comments = {};

    try {
        // Get blogpost by id
        const blogPostFromDB = await BlogPost.findByPk(req.params.id);
        if (blogPostFromDB) {
            blogPost = blogPostFromDB.get({ plain: true });

            const authorFromDB = await User.findByPk(blogPost.user_id);
            if (authorFromDB) {
                postAuthor = authorFromDB.get({ plain: true });

                const commentFromDB = await Comment.findAll({
                    where: {
                        blogpost_id: blogPost.id,
                    }
                });
                if (commentFromDB) {
                    comments = commentFromDB.map((c) => c.get({ plain: true }));

                    for (let i = 0; i < comments.length; i++) {

                        const commentAuthorFromDB = await User.findByPk(comments[i].user_id);

                        const commentAuthorData = commentAuthorFromDB.get({ plain: true });
                        comments[i].commentAuthor = commentAuthorData.username;
                    }
                }
            }

            // Send data to handlebars to render page
            res.render('blogs', {
                ...blogPost,
                postAuthor,
                comments,
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                pagetitle: "kwikBlog",
                isOne: true,
                inCommentMode: true,
            });
        } else {
            res.status(500).json('blog with id :' + req.params.id + ' was not found!');
        }
    } catch (err) {
        res.status(500).json(err);
    }

});
// GET /updatePost/:id for user's post
router.get('/updatePost/:id', withAuth, async (req, res) => {

    try {
        // Get blogpost by id
        const userPostFromDB = await BlogPost.findByPk(req.params.id);
        if (userPostFromDB) {
            const updatePost = userPostFromDB.get({ plain: true });

            // Send data to handlebars to render page
            res.render('blogs', {
                ...updatePost,
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                pagetitle: "Your Dashboard",
                isDashboard: true,
                inUpdateMode: true,
            });
        } else {
            res.status(500).json('blog with id :' + req.params.id + ' was not found!');
        }
    } catch (err) {
        res.status(500).json(err);
    }

});
// POST new post
router.get('/addPost', withAuth, async (req, res) => {

    res.render('blogs', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        pagetitle: "Your Dashboard",
        isDashboard: true,
        newPost: true,
    });
})

module.exports = router;
