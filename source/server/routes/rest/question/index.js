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
    getResponseType
} = require('./question');

router.get('/list', auth, getQuestionList);
router.get('/responseType', auth, getResponseType);
router.post('/', addQuestion);

module.exports = router;