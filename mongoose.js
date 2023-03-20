const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    refreshToken: String
})

module.exports = mongoose.model('Users', userSchema)