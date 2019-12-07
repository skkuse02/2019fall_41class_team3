const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());

async function auth(req, res, next){
    if(req.session.user) return next();
    else res.redirect('/login');
}

const {
    addTextAnswer,
    arrangeTime,
    getAnswer,
    evaluateAnswer,
    purchaseAnswer,
    getURL,
    getMessage,
    saveMessage
} = require('./answer');

router.get('/text/:qid', auth, getAnswer);
router.get('/arrange/:qid', auth, getURL);
router.get('/message/:qid', auth, getMessage);

router.post('/message/:qid', auth, saveMessage);
router.post('/purchase/:qid', auth, purchaseAnswer);
router.post('/evaluate/:qid', auth, evaluateAnswer);
router.post('/text/:qid', auth, addTextAnswer);
router.post('/arrange/:qid', auth, arrangeTime);

module.exports = router;