const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { User, BlogPost } = require('../models');

// GET / all BlogPosts
router.get('/', async (req, res) => {
    // Get all BlogPosts and JOIN with user data
    BlogPost.findAll()
        .then((blogPostsFromDB) => {
            // Serialize data so the template can read it
            const blogPosts = blogPostsFromDB.map((bp) => bp.get({ plain: true }));
            res.render('homepage', {
                blogPosts,
                loggedIn: req.session.loggedIn,
                pagetitle: "kwikBlog"
            });
        })
        .catch((err) => res.status(400).json(err))
});

// GET /dashboard for User
router.get('/dashboard', (req, res) => {
    // If the user is already logged in, show their blog posts
    if (req.session.userId) {
        // Get user's own BlogPosts 
        BlogPost.findAll({
            where: {
                userId: req.session.userId
            }
        })
            .then((userblogPostsFromDB) => {
                // Serialize data so the template can read it
                const userblogPosts = userblogPostsFromDB.map((bp) => bp.get({ plain: true }));
                res.render('dashboard', {
                    userblogPosts,
                    loggedIn: req.session.loggedIn,
                    pagetitle: "dashboard"
                });
            })
            .catch((err) => res.status(400).json(err))
    } else {
        res.redirect('/login');
    }
});

// GET /login page
router.get('/login', (req, res) => {

    // if user is already logged in
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
      }

    // create the login partial view
    res.render('login', {
        pagetitle: "kwikBlog",
        boxTitle: 'Login',
        boxButtonText: 'Login!',
        boxSwapLink: '/signup',
        boxSwapLinkText: 'Sign up instead'
    });

});

// GET /signup page
router.get('/signup', (req, res) => {

    res.render('loginsignup', {
        pagetitle: "kwikBlog",
        boxTitle: 'Sign Up',
        boxButtonText: 'Sign Up!',
        boxSwapLink: '/login',
        boxSwapLinkText: 'Login instead'
    });

});

module.exports = router;
