const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// updates post in the database
router.put('/', withAuth, async (req, res) => {

  try {
    const updatePost = await BlogPost.update(
      req.body,
      {
        where: {
          id: req.body.post_id
        }
      });

    res.status(200).json(updatePost);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

router.delete('/', withAuth, async (req, res) => {

  try {
    const deletePost = await BlogPost.destroy({
      where: {
        id: req.body.post_id
      }
    });

    res.status(200).json(deletePost);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

module.exports = router;
