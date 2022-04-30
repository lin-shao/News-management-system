var express = require('express');
var router = express.Router();
var Admin = require('../models/administrator')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'wekfjeqioewsdksfj'

/* GET home page. */
router.post('/login', function(req, res, next) {
  const adminObj = req.body;
 Admin.find({username:req.body.username,password:req.body.password}).then(data => {
   if(data.length >0){
    const token = jwt.sign({adminObj},SECRET_KEY,{ expiresIn: '2h' })
     res.json({'status':2000,"message":'登录成功！',token:token})
   }else {
    res.json({'status':2004,"message":'用户名或密码错误！'})
   }
 })
});
router.get('/getUserInfo',(req,res) => {
  Admin.find(function(err,data){
        res.json(data);
   })
})
router.post('/updatePassword',(req,res) => {
  Admin.findOneAndUpdate({password:req.body.password},{password:req.body.newPassword},function(err,data){
    if(err){
      res.json({'status':400,"message":'修改失败！'})
    }else{
      res.json({'status':200,"message":'修改成功！'})
    }
  })
})
module.exports = router;
