const express = require("express");
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");

app.get("/", (req,res) => {
    res.render("haha",{
        "news" : ["我是小新闻啊","我也是啊","哈哈哈哈"]
    });
});

app.listen(3000);
