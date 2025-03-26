const mysql = require('mysql');

const con = mysql.createConnection({
    host: "193.203.184.227",
  user: "u144217274_rajkumar",
  password: "Computers@2025",
  database: "u144217274_classic"
  });
 

  con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = con;