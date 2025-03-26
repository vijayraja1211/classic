const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'abcde';
const con = require('../db.js');
const verifyToken = require('./verifytoken.js')


router.post('/signin', (req,res)=>{
  try{
      console.log(req.body);
    
    con.query('SELECT * FROM user', async (err, result)=>{
    
    if (err) throw err;
    
    const userdetail = result.find(u => u.username === req.body.username);
    if(!userdetail){
        res.status(404).send("Username does not exit");
      } 
    else{
     const validPassword = await bcrypt.compare(req.body.password, userdetail.password);
     
     if(!validPassword) {
      res.status(400).send("Password does not match");
     }else{ 
       const token = jwt.sign({username: userdetail.username}, secretKey);
     res.send({token});
    }
    }  
    });
  }
  catch(err){
    res.status(500).send('errors in signin');
  }

});

router.post('/signup',async (req,res)=>{
console.log(req.body);  
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashPassword); 
  try{
      con.query("INSERT INTO user (username, password) VALUES ('"+req.body.username+"', '"+hashPassword+"')",(err,result)=>{
          if(err) throw err;
          res.status(200).send(result);
      });
  }
  catch(err){
      res.status(500).send('errors in creating users');
  }
});

router.get('/profile',verifyToken.verifytoken ,(req,res)=>{
  res.send(`Member ${req.user.username}`)
//res.send(`Welcome ${req.user.username}`);
});
  module.exports = router;