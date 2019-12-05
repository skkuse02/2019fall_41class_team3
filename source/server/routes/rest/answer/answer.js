const models = require('../../../models');
const sequelize = require('sequelize');

async function addTextAnswer(req, res){
    try{
        await models.answer.create({
            content: req.body.content,
            star: 0,
            feedback: null,
            arrangement: null,
            qid: req.params.qid,
            mentorId: req.session.user.uid
        });
        res.status(200).send({
            result: true
        });
        
    } catch (err){
    res.status(400).send({
        result: false,
        msg: err.toString()
    });
    }
}


module.exports = {
    addTextAnswer
};