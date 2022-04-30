var mongoose = require("mongoose")
var mongoosePaginate = require('mongoose-paginate');

var announcementSchema = new mongoose.Schema({
    time:String,
    announcementContent:String,
    
})

//使用分页插件
announcementSchema.plugin(mongoosePaginate);

//将该模型暴露

module.exports = new mongoose.model('announcements',announcementSchema)