const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { User, BlogPost } = require('../models');

// GET / all BlogPosts for homepage
router.get('/', async (req, res) => {
    // Get all BlogPosts and JOIN with user data
    BlogPost.findAll({
        // get authorname
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((blogPostsFromDB) => {
            // Serialize data so the template can read it
            const blogPosts = blogPostsFromDB.map((bp) => bp.get({ plain: true }));
            res.render('blogs', {
                blogPosts,
                loggedIn: req.session.loggedIn,
                pagetitle: "kwikBlog"
            });
        })
        .catch((err) => res.status(400).json(err))
});
// GET /dashboard for User's posts
router.get('/dashboard', withAuth, (req, res) => {
    // Get user's own BlogPosts 
    BlogPost.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then((userblogPostsFromDB) => {
            // Serialize data so the template can read it
            const userblogPosts = userblogPostsFromDB.map((bp) => bp.get({ plain: true }));
            res.render('blogs', {
                userblogPosts,
                loggedIn: req.session.loggedIn,
                pagetitle: "Dashboard"
            });
        })
        .catch((err) => res.status(400).json(err))
});
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

    // Get blogpost by id
    const blogPostfromDB = await BlogPost.findByPk(req.params.id, {
        // get authorname
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    if (blogPostfromDB) {
        // Serialize data so the template can read it
        const blogPost = blogPostfromDB.get({ plain: true });
        // Send data to handlebars to render page
        res.render('blog', {
            blogPost,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            pagetitle: "kwikBlog"
        });
    } else {
        res.status(500).json('blog with id :' + req.params.id + ' was not found!');
    }
});



module.exports = router;
