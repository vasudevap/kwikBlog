const router = require('express').Router();

// Import Routes
const user = require('./userRoutes');
const comment = require('./commentRoutes')
const blogPost = require('./addPost.js');
const updatePost = require('./updatePost')

// Set up middleware to listen on routes
router.use('/users', user);
router.use('/addPost', blogPost);
router.use('/comment', comment);
router.use('/updatePost', updatePost);


// export module
module.exports = router;
