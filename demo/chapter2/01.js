
const express = require("express");

const app = express();

app.get("/", (req,res) =>{
    res.send("你好");
});

app.get("/haha", (req,res) => {
    res.send("这是haha页面，哈哈哈哈哈哈");
});

app.get(/^\/student\/([\d]{10})$/, (req,res) =>{
    res.send("学生信息，学号" + req.params[0]);
});

app.get("/teacher/:gonghao", (req,res) => {
    res.send("老师信息，工号" + req.params.gonghao);
});

app.listen(3000);
