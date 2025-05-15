const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
  registerUser, 
  loginUser, 
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback
} = require('../controllers/authController');

// Register and Login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
);

// Facebook OAuth routes
router.get('/facebook', facebookAuth);
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  facebookCallback
);

module.exports = router;