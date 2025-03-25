const express = require('express');
const app = express();
const mysql = require('mysql');
net = require("net")

const port = 5000;
net = require("net");

var con = mysql.createConnection({
  host: "193.203.184.227",

  user: "u144217274_rajkumar",
  password: "Computers@2025",
  database: "u144217274_classic"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  con.query("SELECT * FROM user" , (err, result) => {
    if (err) throw err;
    
   res.send(result);
  });
});



console.log("this is  working");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
