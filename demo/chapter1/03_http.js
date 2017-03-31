
const http = require("http");

const server = http.createServer((req,res) => {
  //req参数表示请求，res表示响应
  console.log("服务器接收到了请求" + req.url);
  //设置头部
  res.writeHead(200, {"Content-Type":"text/html;charset=UTF8"});
  res.write("<h1>我是主标题</h1>");
  res.write("<h2>我是2标题</h2>");
  res.write("<h2>我是2标题</h2>");
  res.write("<h2>我是2标题</h2>");
  res.write("<h3>我是3标题</h3>");
  res.end();
});

//监听端口
server.listen(3000,"127.0.0.1");
