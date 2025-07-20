const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const userController = require('./controllers/UserController')
const app = express();
app.set("views",path.join(__dirname, "views"));
const {findUserByEmail} = require('./db/query');
const { body } = require('express-validator');

app.use(session({secret:process.env.SESSION_SECRET, resave: false, saveUninitialized:false}));
app.use(passport.session());
app.use(express.urlencoded({extended:false}));

app.get('/sign-up',(req,res) => res.sendFile(path.join(__dirname,'views','SignUpForm.html'))); 
app.post('/sign-up',body('password').isLength({ min: 5 }),
  [body('passwordConfirmation').custom((value, { req }) => {
    return value === req.body.password;
  })
  ,body('email').custom(async value => {
    const user = await findUserByEmail(value);
    if (user) {
      throw new Error('E-mail already in use');
    }
  })],userController.insertUser);

app.get('/message',(req,res) => res.sendFile(path.join(__dirname,'views','MessagePage.html')))

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);



const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`the server is listening on ${PORT}`);
});
