//require表示引包，引包就是引用自己的一个特殊功能
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//创建服务器，参数是一个回调函数，表示如果有请求进来，要做什么
const server = http.createServer((req, res) => {
  // req表示请求，request;  res表示响应，response
  //设置HTTP头部，状态码是200，文件类型是html，字符集是utf8
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
  // 该方法告诉服务器所有响应头和主体都已被发送；服务器应将消息视为已完成。 对于每个响应，response.end() 方法必须被调用。
  res.end('Hello World\n');
});

server.listen(port, hostname, () => { 
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});

// require 目录的机制是:
// 如果目录下有 package.json 并指定了 main 字段，则用之
// 如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node
// require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载
// 判断是否是程序的入口文件有两种方式:
// require.main === module（推荐）
// module.parent === null
