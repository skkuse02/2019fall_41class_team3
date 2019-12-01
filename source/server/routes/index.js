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
    try{
        await req.session.destroy(() => {
            req.session;
        });

        res.redirect('/');
    } catch(err){
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
};

async function addTime(req, res){
    try{
        await models.time.destroy({
            where:{
            }
        });
        const t = new Date();
        await t.setFullYear(2018);
        await t.setMonth(0);
        await t.setDate(1);
        await t.setHours(0);
        
        await t.setMinutes(0);
        await t.setSeconds(0);

        for(var i = 1; i <= 12*24*7; i++){
            const tmp = new Date(t);
            await t.setMinutes(t.getMinutes() + 5);
            await models.time.create({
                id: i,
                day_of_week: Math.floor(i/288),
                start_time: tmp,
                end_time: t            
            })
        }
        res.send({
            result: true
        });
    } catch(err){
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
} 

router.post('/login', login);
router.post('/logout', logout);
router.get('/checkID', checkID);

router.get('/admin/addTime', addTime);

module.exports = router;
