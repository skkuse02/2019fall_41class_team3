const models = require('../../../models');
const sequelize = require('sequelize');

async function getQuestionList(req, res){
  try{
    const questions = await models.question.findAll();

    for(let i = 0; i < questions.length; i++){
      let fields = await models.fieldquestion.findAll({
        where:{
          qid: questions[i].id
        },
        attributes: ['field']
      });
      fields = await fields.map(f => f.field);
      questions[i].dataValues.fields = fields;
    };

    res.status(200).send({
      result: true,
      questions: questions
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}

async function addQuestion(req, res){
  try{
    console.log(req.body);
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
      tag: req.body.tag ? req.body.tag : '' ,
      uid: req.session.user.uid,
      star: 0
    });

    const questionId = await models.question.findAll({
      where: {
        title: req.body.title,
        content: req.body.content,
        reward: req.body.reward,
        type: req.body.type,
        tag: req.body.tag ? req.body.tag : '',
        uid: req.session.user.uid,
        star: 0
      }
    });

    if(questionId.length > 1){
      throw new Error("Duplicate Question");
    }

    const qid = questionId[0].id;
    
    await models.sequelize.query(`DELETE FROM fieldquestion where qid = '${qid}'`);
    //add field
    await req.body.fields.forEach(async (f) => {
      try{
        await models.sequelize.query(`INSERT INTO fieldquestion (field, qid, createdAt, updatedAt) VALUES ('${f}','${qid}',CURRENT_TIME, CURRENT_TIME)`);

      } catch (err){
        console.log(err);
      }
    });

    await req.body.available_times.forEach(async (t) => {
      try{
        await models.sequelize.query(`INSERT INTO questiontime (qid, timeId, createdAt, updatedAt) VALUES ('${qid}','${t}',CURRENT_TIME, CURRENT_TIME)`);
      } catch (err){
        console.log(err);
      }
    });

    res.status(200).send({
      result: true
    });
  } catch(err){
    console.log(err);
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

async function getQuestion(req, res){
  try{
    const question = await models.question.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send({
      result: true,
      question: question
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}

async function getQuestionByTime(req, res){
  try{
    let mentor_times = await models.timeuser.findAll({
      where:{
        uid: req.session.user.uid
      },
      attributes: ['timeId']
    });

    mentor_times = await mentor_times.map(time => time.timeId);
    if(mentor_times.length > 0){
      let qids = await models.questiontime.findAll({
        where:{
          timeId: mentor_times
        },
        attributes: ['qid']
      });
      qids = await qids.map(q => q.qid);

      let ans = await models.answer.findAll({
        where: {
          qid: qids
        },
        attributes: ['qid']
      });

      ans = await ans.map(q => q.qid);

      const _qids = [];
      for(let qid in qids){
        if(!ans.includes(qid)){
          _qids.push(qid);
        }
      }

      const questions = await models.question.findAll({
        where:{
          id: _qids
        }
      });

      res.status(200).send({
        result: true,
        questions: questions
      });
    } else{
      throw new Error("Mentor has no available time");
    }
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}

async function addStar(req, res){
  try{
    const question = await models.question.findOne({
      where: {
        id: req.params.qid
      },
      attributes: ['star']
    });

    await models.question.update({
      star: question.star + 1
    },{
      where: {
        id: req.params.qid
      }
    });

    res.status(200).send({
      result: true,
      stars: question.star + 1
    });
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  } 
}

async function getArrangement(req, res){
  try{
    const answer = await models.answer.findOne({
      where: {
        qid: req.params.qid
      }
    });

    const question = await models.question.findOne({
      where: {
        id: req.params.qid
      }
    });

    if(!answer || !answer.arrangement){
      throw new Error("Not arranged")
    }
    if(req.session.user.uid != answer.mentorId && req.session.user.uid != question.uid){
      throw new Error("Invalid user");
    }

    const hash = req.query.room;


    res.status(200).send({
      result: true,
      question: question,
      arranged: answer.arrangement.toLocaleTimeString()
    });

  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function deleteQuestion(req, res){
  try{
    const question = await models.question.findOne({
      where: {
        id: req.params.qid
      }
    });
    if(req.session.user.uid == question.uid){
      await models.question.destroy({
        where: {
          id: req.params.qid
        }
      });
      res.status(200).send({
        result: true
      });
    } else{
      throw new Error("Not your question");
    }
  } catch(err){
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function getQuestionTime(req, res){
  try{
    let times = await models.questiontime.findAll({
      where: {
        qid: req.params.qid
      },
      attributes: ['timeId']
    });
    times = await times.map((t) => t.timdId);
    res.status(200).send({
      result: true,
      available_times: times
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
  getResponseType,
  getQuestion,
  getQuestionByTime,
  addStar,
  getArrangement,
  deleteQuestion,
  getQuestionTime
};