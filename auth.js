const Users = require('./mongoose')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const crypto = require('crypto')
const bcrypt = require('bcrypt') 
var passport = require('passport');
const { collection } = require('./mongoose');
require('dotenv').config

const resetToken = crypto.randomBytes(32).toString("hex")
const token = crypto.createHash("sha256").update(resetToken).digest("hex")

passport.serializeUser(async(user, done) => {
    const find = await Users.findOne({
        googleId: user.id
    })
    if(find){

        // done(null, user.id)
        // console.log(user.id)
        console.log('topildi')
    }else{
        
        new Users({ 
            username: user.displayName, 
            googleId: user.id,
            refreshToken: token 
        }).save()
        console.log('sozdaan')
        done(null, user)
    }
    
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/regis/google/secrets",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    done(null, profile)
  }
));

//http://localhost:8000/regis/google
// if collection error (username index )
// collection.dropIndexes()