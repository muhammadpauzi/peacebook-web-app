const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User.js");
const passport = require("passport");
const { getEnv } = require("../utils/index.js");

const initPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new GoogleStrategy(
            {
                clientID: getEnv("GOOGLE_CLIENT_ID"),
                clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
                callbackURL: getEnv("GOOGLE_CALLBACK", "/google/callback"),
            },
            async function (accessToken, refreshToken, profile, done) {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // create/insert to mongodb if user doesn't exists
                    const image = profile.photos && profile.photos[0].value;
                    const email = profile.emails && profile.emails[0].value;
                    const username = email?.split("@")[0];
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        username,
                        image,
                        email,
                    });
                }

                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user_, done) => {
        try {
            const user = await User.findOne({ googleId: user_.googleId });
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

module.exports = {
    initPassport,
};
