const models = require('../../../models');
const sequelize = require('sequelize');

async function getFields(req, res){
  try{
    const fields = await models.field.findAll();
    res.status(200).send(fields);
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
  
}

async function addField(req, res){
  try{
    const fields = await models.field.findOne({
      where:{
        name: req.body.name
      }
    });
    if(!fields){
      await models.field.create(req.body);
      res.status(200).send({
        result :true
      });
    } else{
      res.status(400).send({
        result :false
      });
    }
    
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

module.exports = {
  getFields,
  addField
};