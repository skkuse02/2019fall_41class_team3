const models = require('../../../models');
const sequelize = require('sequelize');
const nodemailer = require('nodemailer');
const sha256 = require('sha256');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qahub.no.reply@gmail.com',  
    pass: 'Password1234!'
  }
});

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

        const question = await models.question.findOne({
            where: {
                id: req.params.qid
            }
        });

        const mentee = await models.user.findOne({
            where:{
                uid: question.uid
            }
        });
        
        const mailOptions = {
            from: 'qahub.no.reply@gmail.com',    
            to: mentee.email,       
            subject: '[QAHub] Your question has been answered',   // 제목
            text: `Hello ${mentee.name},
            \n\nYour question titled "${question.title}" has been answered by a mentor.
            \n\nQuestion: "${question.content}"
            \n\nYour Answer: "${req.body.content}"
            \n\nPlease check and evaluate the answer by following the link below:
            \nhttps://qahub.scg.skku.ac.kr/myquestion
            \n\nThank you for using QAHub.`
        };
    
        transporter.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log(error);
            }else{
                console.log(`Email sent to ${req.body.email}`);
            }
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

async function arrangeTime(req, res){
    try{
        const time = await models.time.findOne({
            where:{
                id: req.body.time
            },
            attributes: ['day_of_week','start_time']
        });

        await models.answer.create({
            content: '',
            star: 0,
            feedback: null,
            arrangement: time.start_time,
            qid: req.params.qid,
            mentorId: req.session.user.uid  
        });

        const mentor = await models.user.findOne({
            where: {
                uid: req.session.user.uid
            },
            attributes: ['name', 'email']
        });

        const question = await models.question.findOne({
            where: {
                id: req.params.qid
            }
        });

        const mentee = await models.user.findOne({
            where: {
                uid: question.uid
            },
            attributes: ['name', 'email']
        });
        
        const chatHash = sha256(req.session.user.uid + mentee.uid + time.start_time);
        const url = question.type == 'Live Chatting' ? 'chat' : 'screenshare';
        const mailOptions = {
            from: 'qahub.no.reply@gmail.com',    
            to: mentee.email,       
            subject: '[QAHub] Arrangment for Live Help',   // 제목
            text: `Hello ${mentee.name},\n\nA mentor has been arranged to help you with your question via ${question.type}.
            \n\nTitle: ${question.title}
            \n\nQuestion: ${question.content}
            \n\nArranged time: This ${weekdays[time.day_of_week] + ' ' + time.start_time.toLocaleTimeString()}
            \n\nPlease join this session at the arranged time by clicking the link below:
            \nhttps://qahub.scg.skku.ac.kr/${url}?room=${chatHash}
            \n\n Thank you for using QAHub.`
        };

        const mailOptions2 = {
            from: 'qahub.no.reply@gmail.com',    
            to: mentor.email,       
            subject: '[QAHub] Arrangment for Live Help',   // 제목
            text: `Hello ${mentor.name},\n\nYou have arranged to help you with your question via ${question.type}.
            \n\nTitle: ${question.title}
            \n\nQuestion: ${question.content}
            \n\nArranged time: This ${weekdays[time.day_of_week] + ' ' + time.start_time.toLocaleTimeString()}
            \n\nPlease join this session at the arranged time by clicking the link below:
            \n https://qahub.scg.skku.ac.kr/${url}?room=${chatHash}
            \n\nThank you for using QAHub.`
        };
    
        transporter.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log(error);
            }else{
                console.log(`Email sent to ${req.body.email}`);
            }
        });
    
        transporter.sendMail(mailOptions2, (error, response) => {
            if(error){
                console.log(error);
            }else{
                console.log(`Email sent to ${req.body.email}`);
            }
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

async function getAnswer(req, res){
    try{
        let users = await models.questionuser.findAll({
            where: {
                qid: req.params.qid
            },
            attributes: ['userUid']
        });

        const question = await models.question.findOne({
            where:{
                id: req.params.qid
            }
        });

        users = await users.map((u) => u.userUid);

        if(question.uid == req.session.user.uid || users.includes(req.session.user.uid)){
            const answer = await models.answer.findOne({
                where:{
                    qid: req.params.qid
                }
            });
            res.status(200).send({
                result: true,
                answer: answer
            });
        } else{
            throw new Error("No permission to view answer");
        }

    } catch(err){
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}

async function evaluateAnswer(req, res){
    try{
        const answer = await models.answer.findOne({
            where:{
                qid: req.params.qid
            },
            attributes: ['mentorId', 'content']
        });

        const mentor = await models.user.findOne({
            where: {
                uid: answer.mentorId
            }
        });

        const mentee = await models.user.findOne({
            where: {
                uid: req.session.user.uid
            }
        });

        if(answer.feedback == null){
            if(mentee.points - req.body.reward < 0) throw new Error("Mentee does not have enough points");

            await models.user.update({
                points: mentee.points - req.body.reward
            }, {
                where: {
                    uid: mentee.uid
                }
            });

            await models.user.update({
                points: mentor.points + req.body.reward
            }, {
                where: {
                    uid: mentor.uid
                }
            });

        }

        await models.answer.update({
            star: req.body.star,
            feedback: req.body.feedback
        });


        const mailOptions = {
            from: 'qahub.no.reply@gmail.com',    
            to: mentor.email,       
            subject: '[QAHub] Your answer has been evaluated.',   // 제목
            text: `Hello ${mentor.name},
            \n\nYour response for the question titled "${question.title}" has been evaluated by the mentee.
            \n\nQuestion: "${question.content}"
            \n\nYour Answer: "${answer.content}"
            \n\nRewarded points: ${req.body.reward}
            \n\nThank you for using QAHub.`
        };
    
        transporter.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log(error);
            }else{
                console.log(`Email sent to ${req.body.email}`);
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

module.exports = {
    addTextAnswer,
    arrangeTime,
    getAnswer,
    evaluateAnswer
};