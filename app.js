`use strict`

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite');
const formidable = require('express-formidable');

const routers = require('./routes/index');
const pkg = require('./package');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie
app.use(cookieParser());

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

// flash中间件，用来显示通知
app.use(flash());

// 处理表单及上传文件的中间件
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/images'), //上传的目录
  keepExtensions: true // 保留后缀
}));

// 设置模板全局变量(常量)
app.locals.blog = {
  title: pkg.name
};

// 添加模板必须的三个变量（变量）
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error =  req.flash('error').toString();
  next();
});

// 路由
routers(app);

// error page
app.use((err, req, res, next) => {
  res.render('error', {
    error: err
  });
});

//module.exports = app;

app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
