const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user.js') // user model path
const bcrypt = require('bcryptjs');

// check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/index.html') // redirect to login
  }
}

// Registration route
router.post('/register', async function(req, res, next) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    req.session.userId = newUser.id; // Automatically log in the new user
    res.redirect('/profile.html'); // Redirect to a page
  } catch (error) {
    // Handle errors, maybe the username is taken
    res.status(500).send(error.message);
  }
});

// Login route
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id; // Set a session property
    res.redirect('/profile.html'); // Redirect to a page
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// logout route
router.post('/logout', function(req, res, next) {
  req.session.destroy(err=> {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.redirect('/index.html')
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// profile page router
router.get('/profile', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '../public/profile.html'))
});

// fetch list of users
router.get('/list', isAuthenticated, async (req, res) => {
  try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
  } catch (error) {
    console.error('Failed to fetch users: ', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
