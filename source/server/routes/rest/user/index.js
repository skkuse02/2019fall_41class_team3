const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());
async function auth(req, res, next){
    if(req.session.user) return next();
    else res.redirect('/login');
}

const {
    getSession,
    searchUserId,
    findPassword,
    getUserCredit,
    addUserCredit,
    upsertUser,
    withdrawUserCredit,
    getMyQuestions,
    getMyAnswers,
    getAvailableTime,
    changePassword
} = require('./user');

router.get('/session', getSession);
router.post('/password/change', auth, changePassword);
router.post('/id', searchUserId);
router.post('/password', findPassword);
router.get('/credit', auth, getUserCredit);
router.get('/myQuestions', auth, getMyQuestions);
router.get('/myAnswers', auth, getMyAnswers);
router.get('/availableTime',auth, getAvailableTime);

router.post('/credit', auth, addUserCredit);
router.post('/withdraw', auth, withdrawUserCredit);
router.post('/',upsertUser);

module.exports = router;