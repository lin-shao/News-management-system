var mongoose = require("mongoose")
var mongoosePaginate = require('mongoose-paginate');

var newsSchema = new mongoose.Schema({
    title:String,
    classify:String,
    author:String,
    imgUrl:String,
    newsDate:String,
    content:String
})
// 创建索引
// MongoDB提供文本索引以支持对字符串内容的文本搜索查询。
// text索引可以包括其值为字符串或字符串元素数组的任何字段。 要执行文本搜索查询，必须text在集合上有 索引。集合只能有一个 文本搜索索引，但该索引可以涵盖多个字段。
newsSchema.index({title: 'text', classify: 'text',author:'text',content: 'text'})
//使用分页插件
newsSchema.plugin(mongoosePaginate);

//将该模型暴露

module.exports = new mongoose.model('News',newsSchema)