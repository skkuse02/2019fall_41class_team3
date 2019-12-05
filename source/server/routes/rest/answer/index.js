const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());

async function auth(req, res, next){
    if(req.session.user) return next();
    else res.redirect('/login');
}

const {
    addTextAnswer,
    arrangeTime
} = require('./answer');

router.post('/text/:qid', addTextAnswer);
router.post('/arrange/:qid', arrangeTime);

module.exports = router;