const express = require('express');
const sha256 = require('sha256');
const models = require('../models');
const router = express.Router();


async function login(req, res){
    const usr = await models.user.findOne({
        where:{
            uid: req.body.uid,
            password: sha256(req.body.password)
        }
    });
    if(usr){
        req.session
        res.status(200).send({
            result: true
        });
    } else{
        res.status(404).send({
            result: false
        });
    }
}

router.post('/login', login);

module.exports = router;
