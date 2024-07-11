const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "790406553764-o0tu23cb3dnoek99ntf8dhrvblnqu857.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // Update the existing user with Google ID
            user.googleId = profile.id;
            user.name = profile.displayName;
            user.avatar = profile.photos[0].value;
            await user.save();
        } else {
            // Create a new user
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
            });
            await user.save();
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));
