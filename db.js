const mysql = require('mysql');

const con = mysql.createConnection({
      host: "217.21.84.154",
  user: "u544098027_vijay",
  password: "Speaking@2025",
  database: "u544098027_speaking"
  });
 

  con.connect((err) => {  
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = con;