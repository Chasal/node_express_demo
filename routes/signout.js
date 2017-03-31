`use strict`

const express = require('express');
const router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, (req, res, next) => {
  // 清空session中的用户信息
  req.session.user = null;
  req.flash('success', '登出成功');
  // 登出成功跳转到主页
  res.redirect('/posts');
});

module.exports = router;
