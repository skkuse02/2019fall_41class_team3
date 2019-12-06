const models = require('../../../models');
const crypto = require('crypto');
const sequelize = require('sequelize');
const generator = require('generate-password');
const sha256 = require('sha256');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qahub.no.reply@gmail.com',  
    pass: 'Password1234!'
  }
});

async function getSession(req, res){
  if(req.session.user){
    res.status(200).send({
      result: true,
      user: req.session.user
    });
  } else{
    res.status(404).send({
      result: false
    });
  }
}

async function searchUserId(req, res){
  try{
    const user = await models.user.findOne({
      where:{
        name: req.body.name,
        email: req.body.email
      }
    });

    if(user){
      res.status(200).send({
        uid: user.uid,
        result: true
      });
    } else{
      res.status(404).send({
        result: false,
        msg: 'User is not registered in the system. Please check your name and email address again.'
      });
    }
  } catch(err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function findPassword(req, res){
  try{
    const user = await models.user.findOne({
      where:{
        uid: req.body.uid,
        name: req.body.name,
        email: req.body.email
      }
    });
    if(user){
      //TODO: send email to user with new password
      //generate new password, update DB, send email
      let password = generator.generate({
        length: 10,
        uppercase: true,
        lowercase: true,
        numbers: true
      });

      const mailOptions = {
        from: 'qahub.no.reply@gmail.com',    
        to: req.body.email,       
        subject: '[QAHub] Your Temporary Password',   // 제목
        text: `Hello ${req.body.name},\n\n Your temporary password is '${password}'.\n\nPlease login with the temporary password to reset your password.\n\nhttps://qahub.scg.skku.ac.kr/login`  // 내용
      };

      transporter.sendMail(mailOptions, (error, response) => {
        if(error){
            console.log(error);
        }else{
            console.log(`Email sent to ${req.body.email}, ${password}`);
        }
      });

      const hashed_pw = sha256(password);

      await models.user.update({
        password: hashed_pw
      },{
        where: {
          uid: req.body.uid
        }
      });
      
      res.status(200).send({
        result: true
      });
    } else{
      //not found
      res.status(404).send({
        result: false,
        msg: 'User not found'
      });
    }
  } catch (err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function getUserCredit(req, res){
  try{
    const user = await models.user.findOne({
      where: {
        uid: req.session.user.uid
      },
      attributes: ['points']
    });

    res.status(200).send({
      result: true,
      credit: user.points
    });
  } catch (err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function getUserCredit(req, res){
  try{
    const user = await models.user.findOne({
      where: {
        uid: req.session.user.uid
      },
      attributes: ['points']
    });

    res.status(200).send({
      result: true,
      credit: user.points
    });
  } catch (err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function withdrawUserCredit(req, res){
  try{
    const user = await models.user.findOne({
      where: {
        uid: req.session.user.uid
      },
      attributes: ['points']
    });
    if(user.points - req.body.amount < 0){
      throw new Error(`Not enough credit for user ${req.session.user.uid}`);
    }
    await models.user.update({points: parseInt(user.points) - parseInt(req.body.amount)}, {
      where: {
        uid: req.session.user.uid
      }
    })

    res.status(200).send({
      result: true,
      amount: req.body.amount,
      total: user.points + req.body.amount
    });
  } catch (err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function addUserCredit(req, res){
  try{
    const user = await models.user.findOne({
      where: {
        uid: req.session.user.uid
      },
      attributes: ['points']
    });

    await models.user.update({points: parseInt(user.points) + parseInt(req.body.amount)}, {
      where: {
        uid: req.session.user.uid
      }
    })

    res.status(200).send({
      result: true,
      amount: req.body.amount,
      total: user.points + req.body.amount
    });
  } catch (err){
    //bad request
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}


async function upsertUser(req, res){
  try{
    const user = await models.user.findOne({
      where: {
        uid: req.body.uid
      }
    });
    if(!user){
      await models.user.create({
        uid: req.body.uid,
        name: req.body.name,
        password: sha256(req.body.password),
        nickname: req.body.nickname,
        email: req.body.email,
        type: req.body.type,
        rank: 1,
        points: 0
      }); 
    } else{
      await models.user.update({
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email
      }, {
        where:{
          uid: req.body.uid
        }
      }); 

      req.session.user = await models.user.findOne({
        where: {
            uid: req.body.uid
        },
        attributes: ['uid','name', 'email', 'nickname','rank', 'type']
    });

    }

    await models.sequelize.query(`DELETE FROM fielduser where userUid = '${req.body.uid}'`);
    //add field
    if(req.body.fields.length > 0){
      await req.body.fields.forEach(async (f) => {
        try{
          await models.sequelize.query(`INSERT INTO fielduser (field, userUid, createdAt, updatedAt) VALUES ('${f}','${req.body.uid}',CURRENT_TIME, CURRENT_TIME)`);

        } catch (err){
          console.log(err);
        }
      });
    }

    if(req.body.type == "Mentor" && req.body.available_times.length > 0){
      await models.sequelize.query(`DELETE FROM timeuser where uid = '${req.body.uid}'`);
      //add field
      await req.body.available_times.forEach(async (t) => {
        try{
          await models.sequelize.query(`INSERT INTO timeuser (uid, timeId, createdAt, updatedAt) VALUES ('${req.body.uid}','${t}',CURRENT_TIME, CURRENT_TIME)`);
        } catch (err){
          console.log(err);
        }
      });
    }
    

    res.status(200).send({
      result: true
    });
  } catch (err){
    //bad request
    console.log(err);
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function getMyQuestions(req, res){
  try{
    const questions = await models.question.findAll({
      where:{
        uid: req.session.user.uid
      }
    });

    res.status(200).send({
      result: true,
      questions: questions
    });
  } catch (err){
    //bad request
    console.log(err);
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}

async function getMyAnswers(req, res){
  try{
    const answers = await models.answer.findAll({
      where:{
        mentorId: req.session.user.uid
      }
    });

    const qids = await answers.map(a => a.qid);

    const questions = await models.question.findAll({
      where:{
        id: qids
      }
    });

    res.status(200).send({
      result: true,
      questions: questions
    });
  } catch (err){
    //bad request
    console.log(err);
    res.status(400).send({
      result: false,
      msg: err.toString()
    });
  }
}


module.exports = {
  getSession,
  searchUserId,
  findPassword,
  getUserCredit,
  addUserCredit,
  withdrawUserCredit,
  upsertUser,
  getMyQuestions,
  getMyAnswers
};