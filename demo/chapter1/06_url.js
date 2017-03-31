const http = require("http");
const url = require("url");

const server = http.createServer((req,res) => {
  //得到查询部分，由于写了true，那么就是一个对象
  let queryObj = url.parse(req.url,true).query;
  let name = queryObj.name;
  let age = queryObj.age;
  let sex = queryObj.sex;

  res.end("服务器收到了表单请求" + name + age + sex);
});

server.listen(3000,"127.0.0.1");
