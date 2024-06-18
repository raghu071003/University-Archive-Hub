const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
},{collection:'Users'})


module.exports = mongoose.model('Users',userSchema)