const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

const con = require('../db.js');
const verifyToken = require('./verifytoken.js');

router.get('/',verifyToken.verifytoken,(req, res)=>{
  try{
    
    
      const employees = "SELECT * FROM employee";
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
    const hashPassword = await bcrypt.hash(req.body.Password, 10);
     const EmpId = "0" +(parseInt(req.body.length) + 1);
      const employees = "INSERT INTO employee (Id, name, Phoneno, Password, Email, Aadhar, Address, Location) VALUES ('"+EmpId+"','"+req.body.Name+"','"+req.body.PhoneNo+"','"+hashPassword+"','"+req.body.Email+"','"+req.body.Aadhar+"','"+req.body.Address+"','"+req.body.Location+"')";
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
        Aadhar:Joi.number().min(12).required(),
        Name:Joi.string().min(3).required(),  
        Password:Joi.string().min(2).required(),
        PhoneNo:Joi.number().min(10).required(),
        Email:Joi.string().min(3),
        Location:Joi.string().min(2).required(),
        length:Joi.number().min(0),  
        Address:Joi.string().min(3).required(),
    });
    return schema.validate(employee);
  }
  module.exports = router;