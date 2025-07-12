const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

const con = require('../db.js');
const verifyToken = require('./verifytoken.js');

router.get('/score',(req, res)=>{
  try{
    
    
      const employees = "SELECT * FROM score";
  con.query(employees , (err, result) => {
    if (err) throw err;
    
    res.send(result);
  });
  }
  catch(err){

  }
});

router.delete('/score/:section',verifyToken.verifytoken, async(req, res)=>{

try{
  const section = req.params.section;
  console.log("working");
   const sql = 'DELETE FROM score WHERE section = ?';
  con.query(sql, [section], (err, result) => {  
  
    if (err) throw err;
    res.send(result);
  });

}
catch(err){
console.log(err);
}

 

});

router.post('/score',verifyToken.verifytoken, async (req, res) => {
  try{

    const errorValue = errorValidation1(req.body);
    if(errorValue.error){
      res.status(400).send(errorValue.error.details[0].message);
      return;
    }
    const employees = "INSERT INTO score (username, title, section, wrongattempt, timetaken, action, correctans, wrongans) VALUES ('"+req.body.username+"','"+req.body.title+"','"+req.body.section+"','"+req.body.wrongattempt+"','"+req.body.timetaken+"','"+req.body.action+"','"+req.body.correctans+"','"+req.body.wrongAns+"')";
  con.query(employees , (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  //newLengthh = newLengthh + 1;
  
 
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
  function errorValidation1(employee){
    const schema = Joi.object({
       
        username:Joi.string().min(3).required(),  
       title:Joi.string().min(3),
        section:Joi.string().min(2).required(),
        wrongattempt:Joi.number().min(0),
        timetaken:Joi.number().min(1),
        action:Joi.string().min(2).required(),
        correctans:Joi.number().min(0),
        wrongans:Joi.number().min(0),
    });
    return schema.validate(employee);
  }
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