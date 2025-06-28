const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

const con = require('../db.js');
const verifyToken = require('./verifytoken.js');

router.get('/',(req, res)=>{
  try{
    
    
      const employees = "SELECT * FROM user";
  con.query(employees , (err, result) => {
    if (err) throw err;
    
    res.send(result);
  });
  }
  catch(err){

  }
});

router.post('/',verifyToken.verifytoken, async (req, res) => {
  try{

    const errorValue = errorValidation(req.body);
    if(errorValue.error){
      res.status(400).send(errorValue.error.details[0].message);
      return;
    }
    console.log(req.body.length);
    
      const employees = "INSERT INTO teacher (teachername, phoneno, email, address, schoolname) VALUES ('"+req.body.Name+"','"+req.body.PhoneNo+"','"+req.body.Email+"','"+req.body.Address+"','"+req.body.Schoolname+"')";
  con.query(employees , (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  //newLengthh = newLengthh + 1;
  
 
  }
  catch(err){

  }
});
  function errorValidation(employee){
    const schema = Joi.object({
       
        Name:Joi.string().min(3).required(),  
       Schoolname:Joi.string().min(3),
        PhoneNo:Joi.number().min(10).required(),
        Email:Joi.string().min(3),
        city:Joi.string().min(3),
        Address:Joi.string().min(2).required(),
        
        
    });
    return schema.validate(employee);
  }
  module.exports = router;