const router = require('express').Router();
const user = require('./userRoutes');
const comment = require('./commentRoutes')
// const blogPost = require('./blogpost.js');

router.use('/users', user);
// router.use('/blogposts', blogPost);
router.use('/comment', comment);


// export module
module.exports = router;
