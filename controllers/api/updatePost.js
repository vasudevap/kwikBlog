const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// updates post in the database
router.post('/', withAuth, async (req, res) => {

  // console.log(req.body);

  try {
    const updatePost = await BlogPost.update(
      req.body,
      {
        where: {
          id: req.body.post_id
        }
      });
    console.log(updatePost);

    res.status(200).json(updatePost);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

module.exports = router;
