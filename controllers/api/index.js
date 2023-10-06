const router = require('express').Router();
const user = require('./userRoutes');
const comment = require('./commentRoutes')
const blogPost = require('./addPost.js');

router.use('/users', user);
router.use('/addPost', blogPost);
router.use('/comment', comment);


// export module
module.exports = router;
