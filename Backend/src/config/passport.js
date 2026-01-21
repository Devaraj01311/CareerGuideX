const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/user/google/callback`,
      scope: ["profile", "email"], 
    },
    async (_, __, profile, done) => {
      try {
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) return done(new Error("Google email not available"), null);

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: email,
            image: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
            provider: "google",
            providerId: profile.id,
            isVerified: true,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/user/github/callback`,
      scope: ["user:email"], 
    },
    async (_, __, profile, done) => {
      try {
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) return done(new Error("GitHub email not available"), null);

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.username,
            email: email,
            image: profile.photos[0].value,
            provider: "github",
            providerId: profile.id,
            isVerified: true,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

