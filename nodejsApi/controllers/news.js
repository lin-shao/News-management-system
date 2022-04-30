var News = require('../models/news')
var sd = require('silly-datetime');
//发布新闻
exports.create = (req,res,next) => {
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    const news = new News ({
        title:req.body.title,
        classify:req.body.classify,
        author:req.body.author,
        imgUrl:req.body.imgUrl,
        newsDate:time,
        content:req.body.content
    })
    news.save((err,data) => {
        if (err) {
            res.send({'status': 1004, 'message': '新闻发布失败！！', 'data': err});
        } else {
            res.send({'status': 1000, 'message': '新闻发布成功!',"data":data});
        }
    })
}
//返回所有新闻数据
exports.find = (req,res,next) => {
    var query = req.body.query || {};
    News.find(query,function(err,data){
        res.json(data);
   })
}
//更新新闻
exports.update = (req,res,next) => {
    const _id = req.body._id;
    News.findByIdAndUpdate(_id,req.body).then(res => {
        res.json({msg:"数据修改成功",status:200})
    }).catch( err => {
        res.json({msg:"修改新闻失败",status:400})
    })
}

////删除新闻
exports.delete = (req,res) => {
    console.log(req.params.id)
    News.findOneAndRemove({_id:req.params.id}).then(res => {
        res.send('删除成功！')
    }).catch( err => {
        res.json('删除失败！')
    })
}

//使用模糊搜索法搜索新闻
exports.search = (req,res) => {
    let searchValue = req.body.keyWord;
    console.log(searchValue)
    var str=".*"+searchValue+".*$"
    var reg = new RegExp(str);
    News.find({$text:{$search: reg}},{score: {$meta: "textScore"}})
    .sort({score:{$meta: "textScore"}}) 
    .exec((err,data) => {
        if(err){
            console.log(err);
            return res.json({status:500,msg:"查找新闻的内容为空！"})
        }
        let length = data.length;
        return res.json({status:200,msg:"查找新闻成功！",count:length,allSearchNews:data})
    })
}