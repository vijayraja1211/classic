const secretKey = 'abcde';
const jwt = require('jsonwebtoken');
const con = require('../db.js');


const verifytoken = (req, res, next) =>{

    const token = req.headers.authorization;
   // console.log(token);
    if(!token) res.status(400).send('access denied');

        try{
        const verified = jwt.verify(token, secretKey);
        con.query("SELECT * FROM user WHERE username = '"+verified.username+"'", async (err, result)=>{
            if(err) throw err;
            //console.log(result.username);
           req.details = result;
           next();
        });
       
        
        }
        catch(err){
        res.status(400).send('Invalid Token');
        }   
}
module.exports = {verifytoken};