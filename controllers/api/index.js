const router = require('express').Router();
const user = require('./userRoutes');
// const blogPost = require('./blogpost.js');

router.use('/users', user);
// router.use('/blogposts', blogPost);

// export module
module.exports = router;
