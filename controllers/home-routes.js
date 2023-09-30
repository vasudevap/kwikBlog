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
                loggedIn: req.session.loggedIn
            });
        })
        .catch((err) => res.status(400).json(err))
});

// GET User dashboard
router.get('/dashboard', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    // if (req.session.loggedIn) {
    //   res.redirect('/profile');
    //   return;
    // }
    res.render('login');
});
module.exports = router;
