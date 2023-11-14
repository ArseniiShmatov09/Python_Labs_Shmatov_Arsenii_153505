import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: '697629924081-cf8clg6094m6larip068rgqple74ra23.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000' // Укажите правильный callback URL
  },
  (accessToken, refreshToken, profile, done) => {
    // Ваша логика для сохранения пользователя в базе данных или возвращения пользователя
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});