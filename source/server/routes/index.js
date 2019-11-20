const express = require('express');
const models = require('../models');
const sha256 = require('sha256');
const router = express.Router();


async function login(req, res){
    try{
        const user = await models.user.findOne({
            where: {
                uid: req.body.uid,
                password: sha256(req.body.password)
            },
            attributes: ['uid','name', 'email', 'nickname','rank', 'type']
        });

        if(user){
            req.session.user = user; 
            res.status(200).send({
                result: true
            });
        } else{
            res.status(404).send({
                result: false
            });
        }
    } catch(err){
        //bad request
        res.status(400).send({
          result: false,
          msg: err.toString()
        });
    };
}

async function checkID(req, res){
    try{
        const user = await models.user.findOne({
            where:{
                uid: req.body.uid
            }
        })

        if(user){
            //found
            res.status(200).send({
                result: true
            });
        } else{
            //not found
            res.status(404).send({
                result: false
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

async function logout(req, res){
    req.session.destroy(() => {
        req.session;
    });
    
    res.redirect('/');
  };
  

router.post('/login', login);
router.post('/logout', logout);
router.get('/checkID', checkID);

module.exports = router;
