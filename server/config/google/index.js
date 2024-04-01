const path = require('path');
const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '.env') });

const google = function (Users, passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(async function () {
          try {
            const [user, created] = await Users.findOrCreate({
              where: { profileId: profile.id },
              defaults: {
                profileId: profile.id,
                token: accessToken,
                email: (profile.emails[0].value || '').toLowerCase(),
                name: profile.displayName,
                profilePicture: profile.photos[0].value || '',
                provider: 'Google',
                createdAt: Date.now(),
                updatedAt: Date.now(),
              },
            });

            if (!created && user.dataValues) {
              return done('', user.dataValues);
            } else if (created && user.dataValues) {
              return done('', user.dataValues);
            }
          } catch (err) {
            console.log('error: ', err);

            const user = null;

            return done(err, user);
          }
        });
      },
    ),
  );
};

module.exports.google = google;
