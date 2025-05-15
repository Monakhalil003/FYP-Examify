const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    proxy: true,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      }

      // If not, create new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id, // Using profile ID as password for social auth
        userType: 'examinee', // Default user type
        contact: profile.emails[0].value || 'Not provided',
        googleId: profile.id
      });

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      }

      // If not, create new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id, // Using profile ID as password for social auth
        userType: 'examinee', // Default user type
        contact: profile.emails[0].value,
        facebookId: profile.id
      });

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
)); 