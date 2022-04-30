var mongoose = require('mongoose')

var administratorSchema = new mongoose.Schema({
    username:String,
    password:String
})

module.exports = mongoose.model('administrators',administratorSchema)