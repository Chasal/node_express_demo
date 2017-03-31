const http = require("http");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) =>{
  if (req.url == "/fang") {
    fs.readFile("./test/fang.html", (err, data) => {
      res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
      res.end(data);
    });
  } else if (req.url == "/yuan") {
    fs.readFile("./test/haha.html", (err, data) => {
      res.writeHead(200, {"Content-type":"text/html;charset=UTF-8"});
      res.end(data);
    });
  } else if (req.url == "/0.jpg"){
    fs.readFile("./test/0.jpg", (err, data) => {
      res.writeHead(200, {"Content-type":"image/jpg"});
      res.end(data);
    });
  } else if (req.url == "/bbbbbb.css") {
    fs.readFile("./test/aaaaaa.css", (err, data) => {
      res.writeHead(200, {"Content-type":"text/css"});
      res.end(data);
    });
  } else {
    res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
    res.end("没有这个页面呦");
  }
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
