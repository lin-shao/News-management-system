var Announcement = require("../models/announcement")
// var sd = require('silly-datetime');

// const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');

exports.create = ((req,res,next) => {
    const announcement = new Announcement({
        time:req.body.time,
        announcementContent:req.body.announcementContent,
        
    })
    announcement.save((err,data) => {
        if(err) {
            res.send({"status":412,"message":"发布广告失败！","data":err})
        }else {
            res.send({"status":210,"message":"发布广告成功！","data":data})
        }
    })
})

exports.find = (req,res,next) => {
    var query = req.body.query || {};
    Announcement.find(query,function(err,data){
        res.json(data);
   })
}
//更新公告
exports.update = (req,res,next) => {
    const _id = req.body._id;
    Announcement.findByIdAndUpdate(_id,req.body).then(res => {
        res.json({msg:"修改公告成功",status:200})
    }).catch( err => {
        res.json({msg:"修改公告失败",status:400})
    })
}

////删除新闻
exports.delete = (req,res) => {
    console.log(req.params.id)
    Announcement.findOneAndRemove({_id:req.params.id}).then(res => {
        res.send('删除成功！')
    }).catch( err => {
        res.json('删除失败！')
    })
}