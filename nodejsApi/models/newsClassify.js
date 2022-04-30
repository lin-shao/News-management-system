var mongoose = require("mongoose")
var mongoosePaginate = require('mongoose-paginate');

var newsClassifySchema = new mongoose.Schema({
    classifyId:String,
    newsClassify:String,
    
})

//使用分页插件
newsClassifySchema.plugin(mongoosePaginate);

//将该模型暴露

module.exports = new mongoose.model('newsClassify',newsClassifySchema)