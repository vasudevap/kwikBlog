const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { User, BlogPost } = require('../models');

// GET All BlogPosts
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

// GET User dashboard
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

router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn,
        pagetitle: "login"
    });
});

router.get('/logout', (req, res) => {
    
})
module.exports = router;
