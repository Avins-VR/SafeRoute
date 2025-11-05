const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./User");

function initializePassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          let user = await User.findOne({ email });

          // If user exists but no Google ID yet, link Google to existing account
          if (user && !user.googleId) {
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // If no user exists → create new google account
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              fullName: profile.displayName,
              email: email,
              password: null, // Google users have no password
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}

module.exports = initializePassport;
