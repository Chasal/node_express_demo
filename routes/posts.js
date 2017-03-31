var express = require('express');
var router = express.Router();

const PostModel = require('../models/posts');
const checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', (req, res, next) => {

  let author = req.query.author;
  PostModel.getPosts(author)
    .then(posts => {
      res.render('posts', {
        posts: posts
      });
    });
});

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next) {
  res.render('create');
});

// POST /posts 发表一篇文章
router.post('/create', checkLogin, function(req, res, next) {

  let author = req.session.user._id;
  let title = req.fields.title;
  let content = req.fields.content;

  try {
    if (!title.length) {
      throw new Error('请填写标题');
    }

    if (!content.length) {
      throw new Error('请填写内容');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  let post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  };

  PostModel.create(post)
    .then(result => {
      post = result.ops[0];
      req.flash('success', '发表成功');
      res.redirect('/posts');
    })
    .catch(next);
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', (req, res, next) => {

  let postId = req.params.postId;

  PostModel.getPostById(postId) //获取文章信息
    .then(post => {
      if (!post) {
        throw new Error('该文章不存在')
      }

      res.render('post', {
        post: post
      });
    })
    .catch(next);
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, (req, res, next) => {
  let postId = req.params.postId;
  let author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(post => {
      if (!post) {
        throw new Error('该文章不存在');
      }

      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足');
      }

      res.render('edit', {
        post: post
      });
    })
    .catch(next);
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
  let postId = req.params.postId;
  let author = req.session.user._id;
  let title = req.fields.title;
  let content = req.fields.content;

  PostModel.updatePostById(postId, author, { title: title, content: content })
    .then(function () {
      req.flash('success', '编辑文章成功');
      // 编辑成功后跳转到上一页
      res.redirect(`/posts/${postId}`);
    })
    .catch(next);
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, (req, res, next) => {
  let postId = req.params.postId;
  let author = req.session.user._id;

  PostModel.delPostById(postId, author)
    .then(function () {
      req.flash('success', '删除文章成功');
      // 删除成功后跳转到主页
      res.redirect('/posts');
    })
    .catch(next);
});

module.exports = router;
