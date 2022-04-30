var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
//使用express-jwt来进行token的解密和验证
const expressJWT = require('express-jwt');
var PRIVITE_KEY = "wekfjeqioewsdksfj";


var indexRouter = require('./routes/administrator');
var usersRouter = require('./routes/users');
var imgUpload = require('./routes/imgUpload');
var userAvatar = require('./routes/userAvatar')
var news = require('./routes/news')
var comments = require('./routes/comments')
var announcement = require('./routes/announcement')
var newsClassify = require('./routes/newsClassify')

var app = express();

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/admin');
// 链接成功
mongoose.connection.on('connected',function(){
  console.log("数据库连接成功")
})

//链接异常
mongoose.connection.on('error',function(err){
  console.log("数据库连接异常" + err)
})

// 链接断开
mongoose.connection.on('disconnected',function(){
  console.log("数据库断开连接");
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// 校验token，获取headers⾥里里的Authorization的token，要写在路由加载之前，静态资源之后
app.use(expressJWT({
  secret: PRIVITE_KEY,
  algorithms: ['HS256'],
}).unless({
  path: ['/users/data', '/users/login','/imgUpload/upload/','/news/showNews','/comment/showComment','/users/data','/users/updatePassword','comment/addComment','comment/showComment',
  '/announcement/showAnnouncement','/classify/showNewsClassify','/userAvatar/avatarUpload/','/admin/login','/news/searchNews'] //⽩白名单,除了了这里写的地址，其他的URL都需要验证
}));

app.use('/admin', indexRouter);
app.use('/users', usersRouter);
app.use('/imgUpload', imgUpload);
app.use('/userAvatar',userAvatar)
app.use('/news', news)
app.use('/comment',comments)
app.use('/announcement',announcement)
app.use('/classify',newsClassify)

//设置跨域请求
app.all('*', function (req, res, next) {
  //设置请求头
  //允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*')
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //修改程序信息与版本
  res.header('X-Powered-By', ' 3.2.1')
  //内容类型：如果是post请求必须指定这个属性
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

//去除304 http缓存状态码
app.disable('etag')
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
