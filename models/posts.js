`use strict`

const marked = require('marked');
const Post = require('../lib/mongo').Post;

// plugins
Post.plugin('contentToHtml', {
  afterFind: function(posts) {
    return posts.map(post => {
      post.content = marked(post.content);
      return post;
    })
  },
  afterFindOne: function(post) {
    if (post) {
      post.content = marked(post.content);
      return post;
    }
  }
});

module.exports = {
  //创建一篇文章
  create: function (post) {
    return Post.create(post).exec();
  },
  getPosts: function (author) {
    let query = {};
    if (author) {
      query.author = author;
    }

    return Post
      .find(query)
      .populate({path: 'author', model: 'User'})
      .sort({_id: -1})
      .contentToHtml()
      .exec();
  },
  getPostById: function (postId) {
    return Post
      .findOne({_id: postId})
      .populate({path: 'author', model: 'User'})
      .contentToHtml()
      .exec();
  },
  // 通过文章的id获取一篇原生文章（编辑文章）
  getRawPostById: function (postId) {
    return Post
      .findOne({_id: postId})
      .populate({path: 'author', model: 'User'})
      .exec();
  },
  updatePostById: function (postId, author, data) {
    return Post
      .update({author: author, _id: postId}, {$set: data})
      .exec();
  },
  delPostById: function (postId, author) {
    return Post
      .remove({author: author, _id: postId})
      .exec();
  }
};
