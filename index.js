const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/google').then(() => {
    console.log('mongoose connected')
}).catch((err) => {
    throw new Error(err)
})

require('dotenv').config()
require('./auth')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/regis/google', passport.authenticate('google', { scope: 'profile' }))
app.get('/regis/google/secrets', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.end('logged in!')
})


app.get('/logout', (req, res) => {
    // req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });
  

//http:localhost:8000/api/user/google

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('server is running')
})

