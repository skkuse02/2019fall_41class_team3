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
        uid: user.uid
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

module.exports = {
  getSession,
  searchUserId,
  findPassword,
  getUserCredit
};