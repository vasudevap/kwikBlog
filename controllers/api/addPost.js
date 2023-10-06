const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// add new post to the database
router.post('/', withAuth, async (req, res) => {

  console.log(req.body);

  try {
    const newPost = await BlogPost.create({
      ...req.body,
    });
    console.log(newPost);

    res.status(200).json(newPost);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

module.exports = router;
