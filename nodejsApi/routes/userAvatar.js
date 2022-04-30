var express = require('express')
var router = express.Router()
var multer = require('multer')

var storage = multer.diskStorage({
    //存储位置
    destination: function(req,file,callback){
        callback(null,'./public/userImg/userAvatarImg')
    },
    //存储文件名
    filename: function (req,file,cb) { 
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
//得到multer对象
var upload = multer({storage:storage})

router.post('/avatarUpload',upload.array('img',1),(req,res) => {
    //返回图片的地址
    let file = req.files;
    console.log(file[0]);
    //此时，图片已经保存到我们服务端了
    let fileInfo = {};
    fileInfo.type = file[0].mimetype;
    fileInfo.name = file[0].originalname;
    fileInfo.size = file[0].size;
    fileInfo.path = 'http://localhost:3000/userImg/userAvatarImg/'+file[0].filename;
    res.send({
        code:0,
        value:'图片上传成功！',
        data: fileInfo
    })
})

module.exports = router;
