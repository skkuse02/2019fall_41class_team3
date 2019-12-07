const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());

async function auth(req, res, next){
    if(req.session.user) return next();
    else res.redirect('/login');
}

const {
    getQuestionList,
    addQuestion,
    getQuestion,
    getResponseType,
    getQuestionByTime,
    getArrangement,
    addStar,
    deleteQuestion,
    getQuestionTime
} = require('./question');

router.get('/list', auth, getQuestionList);
router.get('/responseType', auth, getResponseType);
router.get('/availableTime/:qid', auth, getQuestionTime);
router.get('/listByTime', auth, getQuestionByTime);
router.get('/arranged/:qid', auth, getArrangement);
router.get('/:id', auth, getQuestion);

router.post('/delete/:qid', auth, deleteQuestion);
router.post('/star/:qid', auth, addStar);
router.post('/', auth, addQuestion);



module.exports = router;