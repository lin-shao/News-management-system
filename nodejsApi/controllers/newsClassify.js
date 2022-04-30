var newsClassify = require('../models/newsClassify')

exports.create = (req,res,next) => {
    const classify = new newsClassify({
        classifyId:req.body.classifyId,
        newsClassify:req.body.classifyContent  
    })
    classify.save((err,data) => {
        if(err) {
            res.send({"status":4222,"message":"创建新闻分类失败！","data":err})
        }else {
            res.send({"status":2100,"message":"创建新闻分类成功！","data":data})
        }
    })
}

//查询新闻分类
exports.find = (req,res,next) => {
    var query = req.body.query || {};
    newsClassify.find(query,function(err,data){
        res.json(data);
   })
}
//更新新闻分类
exports.update = (req,res,next) => {
    const _id = req.body._id;
    newsClassify.findByIdAndUpdate(_id,req.body).then(res => {
        res.json({msg:"修改新闻分类成功",status:200})
    }).catch( err => {
        res.json({msg:"修改新闻分类失败",status:400})
    })
}

////删除新闻分类
exports.delete = (req,res) => {
    console.log(req.params.id)
    newsClassify.findOneAndRemove({_id:req.params.id}).then(res => {
        res.send('删除成功！')
    }).catch( err => {
        res.json('删除失败！')
    })
}