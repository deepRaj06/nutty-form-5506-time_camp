const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportConfig = require("passport");
require("dotenv").config();

passportConfig.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ['profile', 'email']
    },
    function (accessToken, refreshToken, profile, callback) {
       return callback(null, profile);
    }
  )
);

passportConfig.serializeUser((user, done) => {
  done(null, user);
});

passportConfig.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { passportConfig };
