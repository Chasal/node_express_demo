const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) => {
  //不处理小图标
  if(req.url == "/favicon.ico"){
    return;
  }
  //存储所有的文件夹
  let wenjianjia = [];
  //stat检测状态
  fs.readdir("./album", (err,files) => {
    //files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西
    //包括文件、文件夹
    for (let i = 0 ; i < files.length ;i++) {
      let thefilename = files[i];
      //又要进行一次检测
      fs.stat("./album/" + thefilename , (err, stats) => {
        //如果他是一个文件夹，那么输出它：
        if(stats.isDirectory()){
          wenjianjia.push(thefilename);
        }
        console.log(wenjianjia);
      });
    }
  });
  res.end('End');
});

server.listen(3000,"127.0.0.1");
