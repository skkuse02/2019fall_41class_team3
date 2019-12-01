const models = require('../../../models');
const sequelize = require('sequelize');

async function getFields(req, res){
  try{
    const fields = await models.field.findAll();
    res.status(200).send(fields);
  } catch(err){
    res.status(404).send({
      result: false,
      msg: err.toString()
    });
  }
  
}

module.exports = {
  getFields
};