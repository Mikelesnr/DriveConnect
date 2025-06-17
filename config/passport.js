const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model"); // adjust path to your user model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    // Inside your passport.js GoogleStrategy callback
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ user_email: email }); // <--- Ensure you query by user_email

        if (!user) {
          // User does not exist, create a new one
          user = await User.create({
            firstname: profile.name.givenName, // <--- Corrected field name
            lastname: profile.name.familyName, // <--- Corrected field name
            user_email: email, // <--- Corrected field name
            googleId: profile.id, // <--- Store Google's unique ID
            profilePicture: profile.photos?.[0]?.value, // <--- Store profile picture
            authType: "google", // <--- Set authType
            role: "user", // <--- Explicitly set a default role for Google users, or rely on schema default
            // user_password is intentionally omitted here as it's not required for Google authType
          });
        } else {
          // If user exists, update their Google ID if it's missing (for existing local users linking Google)
          if (!user.googleId) {
            user.googleId = profile.id;
            user.profilePicture = profile.photos?.[0]?.value;
            user.authType = "google"; // Set authType if an existing local user signs in via Google
            await user.save();
          }
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
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
