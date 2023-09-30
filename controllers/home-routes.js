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
            // Pass serialized data and session flag into template
            res.render('homepage', {
                blogPosts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch((err) => res.status(400).json(err))
});

module.exports = router;
