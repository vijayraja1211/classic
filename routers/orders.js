const express = require('express');
const router = express.Router();
const Joi = require('joi');

const con = require('../db.js');
const verifyToken = require('./verifytoken.js');

router.get('/',(req, res)=>{
  try{
      const fields = "SELECT * FROM orders";
  con.query(fields , (err, result) => {
    if (err) throw err;
    res.send(result);
  });
  }
  catch(err){
    console.log(err);
  }
});

router.post('/', (req, res) => {
  try{

    const errorValue = errorValidation(req.body);
    if(errorValue.error){
      res.status(400).send(errorValue.error.details[0].message);
      return;
    }
   
      const order = "INSERT INTO orders (Address,CellNo,Discount,Email,Estimation,FinalPrice,PhoneNo,Quotation,Remarks,Requirement,WhatsappNo,name,otherFields,otherFieldsValue,status) VALUES ('"+req.body.Address+"','"+req.body.CellNo+"','"+req.body.Discount+"','"+req.body.Email+"','"+req.body.Estimation+"','"+req.body.FinalPrice+"','"+req.body.PhoneNo+"','"+req.body.Quotation+"','"+req.body.Remarks+"','"+req.body.Requirement+"','"+req.body.WhatsappNo+"','"+req.body.name+"','"+req.body.otherFields+"','"+req.body.otherFieldsValue+"','"+req.body.status+"')";
  con.query(order , (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
  }
  catch(err){
console.log(err);
  }
});
  function errorValidation(employee){
    const schema = Joi.object({
      Address:Joi.string().min(3).required(),
      CellNo:Joi.number().min(1).required(),
      Discount:Joi.number().min(1).required(),  
      Estimation:Joi.number().min(1).required(),
      FinalPrice:Joi.number().min(1).required(),
      PhoneNo:Joi.number().min(1).required(),
      Quotation:Joi.string().min(3),
      Remar:Joi.string().min(3),
      Requirement:Joi.string().min(3),
      WhatsappNo:Joi.number().min(1).required(),
      Email:Joi.string().min(3),
      name:Joi.string().min(2).required(),
      otherFields:Joi.string().min(0).required(),
      otherFieldsValue:Joi.string().min(0).required(),  
      status:Joi.string().min(3).required(),
      Remarks:Joi.string().min(3).required(),
       
    });
    return schema.validate(employee);
  }
  module.exports = router;