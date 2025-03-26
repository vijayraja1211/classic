const secretKey = 'abcde';
const jwt = require('jsonwebtoken');


const verifytoken = (req, res, next) =>{

    const token = req.headers.authorization;
   // console.log(token);
    if(!token) res.status(400).send('access denied');

        try{
        const verified = jwt.verify(token, secretKey);
       // console.log(verified);
        req.user = verified;
        next();
        }
        catch(err){
        res.status(400).send('Invalid Token');
        }   
}
module.exports = {verifytoken};