import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import multer from 'multer';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import { UserController, CarController } from './controllers/index.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { carCreateValidation, carEditValidation, registerValidation, loginValidation  } from './validation/index.js';
import cors from 'cors';

const app = express();
const storage = multer.diskStorage({
  destination: (_,__, cb)=>{
    cb(null, 'uploads');
  },
  filename: (_, file, cb)=>{
    cb(null, file.originalname);
  },
});

const upload = multer({ storage});

app.use(express.json());
app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb+srv://admin:09120912@cluster0.wogfkyo.mongodb.net/carBlog')
.then(()=>console.log('DB is Ok'))
.catch((err)=> console.log('DB is not Ok' + err));

const GOOGLE_CLIENT_ID = '697629924081-cf8clg6094m6larip068rgqple74ra23.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

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
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.send(`Hello, ${req.user.displayName}!`);
    } else {
      res.send('Hello, guest!');
    }
  });
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/cars', CarController.getAllCars);
app.get('/cars/:id',checkAuth, CarController.getOneCar);
app.post('/cars', checkAuth, carCreateValidation, handleValidationErrors, CarController.createCar);
app.delete('/cars/:id',checkAuth, CarController.removeCar);
app.patch('/cars/:id', checkAuth, carEditValidation, handleValidationErrors, CarController.updateCar);

app.post('/upload', checkAuth, upload.single('image'), (req, res)=>{
  res.json({
    url:`/uploads/${req.file.originalname}`,
  })

});

app.listen(3001, (err)=>{
    if (err) 
        return console.log(err);

    console.log("Server OK");
});

