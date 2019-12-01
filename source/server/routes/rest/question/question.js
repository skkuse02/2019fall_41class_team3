const models = require('../../../models');
const sequelize = require('sequelize');

async function getQuestionList(req, res){
  try{
    const questions = await models.question.findAll();
    res.status(200).send(questions);
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
  
}

module.exports = {
  getQuestionList
};