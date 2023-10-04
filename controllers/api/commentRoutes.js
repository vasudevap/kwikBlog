const router = require('express').Router();
const { User } = require('../../models');

// add new comment to the database
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    console.log(userData);
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json(userData);
    });
  } catch (err) {
    res
      .status(400)
      .json(err);
  }
});

// login route to find registered user and verify credentials
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    // if user wasn't found
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    // if user's password was wrong
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // user was found and password is correct
    // save session
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res
      .status(400)
      .json(err);
  }
});

// destroy active session of user 
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res
        .status(204)
        .end();
    });
  } else {
    res
      .status(404)
      .end();
  }
});

module.exports = router;
