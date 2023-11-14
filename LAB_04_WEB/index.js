import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validation/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';

const app = express();

app.use(express.json());


app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://admin:09120912@cluster0.wogfkyo.mongodb.net/carBlog')
.then(()=>console.log('DB is Ok'))
.catch((err)=> console.log('DB is not Ok' + err));

const GOOGLE_CLIENT_ID = '697629924081-cf8clg6094m6larip068rgqple74ra23.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Настройка GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback'
  },

  (accessToken, refreshToken, profile, done) => {
    // Ваша логика для сохранения пользователя в базе данных или возвращения пользователя
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // Десериализация пользователя из сеанса
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  

  
  // Маршруты для аутентификации через Google
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Успешная аутентификация, перенаправление или что-то еще
      res.redirect('/');
    }
  );
  
  // Ваш обработчик для проверки аутентификации пользователя
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      // Пользователь аутентифицирован
      res.send(`Hello, ${req.user.displayName}!`);
    } else {
      // Пользователь не аутентифицирован
      res.send('Hello, guest!');
    }
  });
app.post('/auth/register', registerValidation, UserController.register);

app.post('/auth/login', registerValidation, UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(3001, (err)=>{
    if (err) 
        return console.log(err);

    console.log("Server OK");
});

