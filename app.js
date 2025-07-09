const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const userController = require('./controllers/UserController')
const app = express();
app.set("views",path.join(__dirname, "views"));

app.use(session({secret:process.env.SESSION_SECRET, resave: false, saveUninitialized:false}));
app.use(passport.session());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res) => res.sendFile(path.join(__dirname,'views','SignUpForm.html'))); 
app.post('/',userController.insertUser);


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`the server is listening on ${PORT}`);
});
