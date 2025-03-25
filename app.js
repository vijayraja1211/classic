const express = require('express');
const app = express();
const mysql = require('mysql');
net = require("net")

const port = 5000;
net = require("net");

var con = mysql.createConnection({
  host: "srv1873.hstgr.io",

  user: "u144217274_rajkumar",
  password: "Computers@2025"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('Hello, vijay');
});
console.log("this is  working");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
