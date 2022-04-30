var User = require('../models/user')
var sd = require('silly-datetime');

//添加用户到数据库
exports.create = (req,res,next) => {
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    User.find({name: req.body.name},(err,data) => {
            if(data.length > 0){
                res.send({'status': 1001, 'message': '该用户名已经注册！'});
            }else{
                let user = new User({
                    name: req.body.name,
                    password:req.body.password,
                    email: req.body.email,
                    sex:req.body.sex,
                    avatarUrl:req.body.avatarUrl,
                    time:time
                });
                user.save((err,data) => {
                    if (err) {
                        res.send({'status': 1002, 'message': '注册失败！', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '注册成功!'});
                    }
                });
            }
        })
}
//验证用户登录
exports.login = (req,res,next) => {
  var querys = req.body;
    User.find(querys,(err,data)=>{
        if(data.length > 0){
            res.json({data,msg:"登录成功！",status:200});
        }else{
            res.json({msg:'没有该用户',status:404});
        }
    })
}

//列出所有会员用户的数据
exports.list = (req,res) => {
    User.find().then(user => {
        if(! user) {
            res.send('用户数据为零')
        }else {
            res.json(user)
        }
    })
}
//修改密码
exports.update = (req,res) => {
    User.findOneAndUpdate({password:req.body.oldPassword},{password:req.body.newPassword2},(err,data) => {
        if(err){
            res.json({msg:"修改失败",status:400})
        }else {
            res.json({msg:"修改成功",status:200})
        }
    })
}

//删除会员
exports.delete = (req,res) => {
    User.findOneAndRemove({_id:req.params.id}).then(res => {
        res.send('删除成功！')
    }).catch( err => {
        res.json('删除失败！')
    })
}