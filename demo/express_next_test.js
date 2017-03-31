`use strict`

const express = require('express');
const app = express();

// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
  res.send('Hello World');
});

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome');
});




app.listen(3000, () => {
  console.log('Start Server');
});
