const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
// User Model
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = require('../middleware/auth');
const db = require('../config/keys').MONGODB_URI;

// @route   POST api/auth
// @desc    Auth user
// @access  Public
// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const { email, password } = req.body;
  //  Simple validation
  if (!email || !password) {
    return res.json({
      success: false,
      error: 'Please enter all fields'
    });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user)
      return res.json({
        success: false,
        error: 'User Does not exist'
      });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.json({
          success: false,
          error: 'Invalid credentials'
        });
      jwt.sign(
        { id: user._id },
        db.SECRET_OR_KEY,
        { expiresIn: '7d' },
        (err, token) => {
          res.json({
            success: true,
            message: 'User logged in',
            token,
            user
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'User has been authenticated',
      user: req.user
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// @route   GET api/auth/logout
// @desc    logout
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.status = 'off';
    req.user.save();
    res.json({
      success: true,
      message: 'User has been  logout'
    });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
