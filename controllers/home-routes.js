const router = require('express').Router();
const withAuth = require('../utils/auth');
const path = require('path');

const { User, BlogPost } = require('../models');

// GET All BlogPosts
router.get('/', async (req, res) => {
    // Get all BlogPosts and JOIN with user data
    BlogPost.findAll()
        .then((blogPosts) => {
            // Serialize data so the template can read it
            const blogPost = blogPosts.map((bp) => bp.get({ plain: true }));
            res.status(200).json(blogPost);
        })
        .catch((err) => res.status(400).json(err))
});

module.exports = router;
