var mongoose = require("mongoose")
//引入分页插件
var mongoosePaginate = require('mongoose-paginate')

var commentsSchema = new mongoose.Schema({
    username:String,
    articleTitle:String,
    comment:String,
    userAvatar:String,
    commentDate:String
})
//使用分页插件
commentsSchema.plugin(mongoosePaginate);
module.exports = new mongoose.model("comments",commentsSchema)