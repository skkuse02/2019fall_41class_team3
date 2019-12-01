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

async function addQuestion(req, res){
  try{
    if(!req.session.user){
      throw new Error("Session expired");
    }

    const rtype = await models.response_type.findOne({
      where:{
        type: req.body.type
      }
    });

    if(req.body.reward < rtype.minimum_point){
      throw new Error(`Minimum reward of ${rtype.minimum_point} required`);
    }
    console.log(req.session.user.uid);
    const question = await models.question.create({
      title: req.body.title,
      content: req.body.content,
      reward: req.body.reward,
      type: req.body.type,
      tag: req.body.field,
      uid: req.session.user.uid,
      star: 0
    });

    const questionId = await models.question.findAll({
      where: {
        title: req.body.title,
        content: req.body.content,
        reward: req.body.reward,
        type: req.body.type,
        tag: req.body.field,
        uid: req.session.user.uid,
        star: 0
      }
    });

    if(questionId.length > 1){
      throw new Error("Duplicate Question");
    }

    const qid = questionId[0].id;

    const now = new Date();
    await req.body.available_times.forEach(async (t) => {
      try{
        const now = new Date();
        await models.sequelize.query(`INSERT INTO questiontime (qid, timeId, createdAt, updatedAt) VALUES ('${qid}','${t}',CURRENT_TIME, CURRENT_TIME)`);
      } catch (err){
        
      }
    });

    res.status(200).send({
      result: true
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}

async function getResponseType(req, res){
  try{
    const rt = await models.response_type.findAll();
    res.status(200).send({
      response_type: rt,
      result: true
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}


module.exports = {
  getQuestionList,
  addQuestion,
  getResponseType
};