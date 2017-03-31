
const express = require("express");

const app = express();

app.use(express.static("./public"));

app.get("/haha",(req,res) => {
    res.send("haha ");
});

app.listen(3000);
