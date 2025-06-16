const express = require('express');
const router = express.Router();
const Joi = require('joi');

const con = require('../db.js');
const verifyToken = require('./verifytoken.js');

router.get('/newfield',(req, res)=>{
  try{
      const fields = "SELECT * FROM fields";
  con.query(fields , (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  }
  catch(err){
    console.log(err);
  }
});

router.post('/newfield', (req, res) => {
  try{

    const errorValue = errorValidation(req.body);
    if(errorValue.error){
      res.status(400).send(errorValue.error.details[0].message);
      return;
    }
   
      const employees = "INSERT INTO fields (name) VALUES ('"+req.body.newfield+"')";
  con.query(employees , (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  }
  catch(err){
console.log(err);
  }
});
  function errorValidation(employee){
    const schema = Joi.object({
      

      newfield:Joi.string().min(3).required(),  
       
    });
    return schema.validate(employee);
  }
  module.exports = router;