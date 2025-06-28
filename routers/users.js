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
      //console.log(req.body);
    
    con.query('SELECT * FROM user', async (err, result)=>{
    
    if (err) throw err;
    console.log(result);
    const userdetail = result.find(u => u.username === req.body.username);
    
    if(!userdetail){
        res.status(404).send("Username does not exit");
      } 
    else{



     const validPassword = await bcrypt.compare(req.body.password, userdetail.password);
     console.log(userdetail.password);
     if(!validPassword) {
      res.status(400).send("Password does not match");
     }else{ 
       const token = jwt.sign({username: userdetail.username}, secretKey);
       const userInfo ={
        tokenDetails: token,
        username: userdetail.username,
        schoolname: userdetail.schoolname,
        role: userdetail.role
       }
     res.send(userInfo);
    }
    }  
    });
  }
  catch(err){
    res.status(500).send('errors in signin');
  }

});

router.post('/signup',async (req,res)=>{

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  
  try{
      con.query("INSERT INTO user (username, password, schoolname, city, role) VALUES ('"+req.body.username+"', '"+hashPassword+"','"+req.body.schoolname+"','"+req.body.city+"','"+req.body.role+"')",(err,result)=>{
          if(err) throw err;
          res.status(200).send(result);
      });
  }
  catch(err){
      res.status(500).send('errors in creating users');
  }
});

router.get('/profile',verifyToken.verifytoken ,(req,res)=>{
  
  const userDetail = {
    username:req.details[0].username,
    schoolname:req.details[0].schoolname,
    city:req.details[0].city,
  }
  console.log(req.details[0].username);
  res.send(userDetail);
//res.send(`Welcome ${req.user.username}`);
});
  module.exports = router;