const models = require('../../../models');
const crypto = require('crypto');
const sequelize = require('sequelize');

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
}

async function findPassword(req, res){
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

    res.status(200).send({
      result: true
    });
  } else{
    res.status(404).send({
      result: false,
      msg: "User not found"
    });
  }
}

module.exports = {
  getSession,
  searchUserId,
  findPassword
};