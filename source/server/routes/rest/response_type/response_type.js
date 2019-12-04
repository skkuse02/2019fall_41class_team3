const models = require('../../../models');
const sequelize = require('sequelize');

async function getResponseType(req, res){
  try{
    const response_types = await models.response_type.findAll();
    res.status(200).send({
      result: true,
      response_types: response_types
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}


module.exports = {
  getResponseType
};