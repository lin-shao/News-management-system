var Comment = require("../models/comment")
var sd = require('silly-datetime');

exports.create = ((req,res,next) => {
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    const username = new Comment({
        username:req.body.username,
        articleTitle:req.body.articleTitle,
        comment:req.body.comment,
        userAvatar:req.body.userAvatar,
        commentDate:time
    })
    console.log(username)
    username.save((err,data) => {
        if(err) {
            res.send({"status":422,"message":"评论失败！","data":err})
        }else {
            res.send({"status":220,"message":"评论成功！","data":data})
        }
    })
})

//查询评论
exports.find = (req,res,next) => {
    var query = req.body.query || {};
    Comment.find(query,function(err,data){
        res.json(data);
   })
}

//删除评论
exports.delete = (req,res) => {
    Comment.findOneAndRemove({_id:req.params.id}).then(res => {
        res.send('删除成功！')
    }).catch( err => {
        res.json('删除失败！')
    })
}