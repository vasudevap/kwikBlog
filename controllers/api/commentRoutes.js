const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// add new comment to the database
router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const newComment = await Comment.create({
      ...req.body,
    });
    console.log(newComment);

    res.status(200).json(newComment);

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(err);
  }
});

module.exports = router;
