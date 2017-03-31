'use strict'

const config = require('config-lite');
const Mongolass = require('mongolass');
const mongolass = new Mongolass(config.mongodb); // mongolass.connect(config.mongodb);

// User model
const User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.User = User;

// Post model
const Post = mongolass.model('Post', {
  author: {type: Mongolass.Types.ObjectId},
  title: {type: 'string'},
  content: {type: 'string'},
  pv: {type: 'number'}
});

Post.index({author: 1, _id: -1}).exec();

exports.Post = Post;
