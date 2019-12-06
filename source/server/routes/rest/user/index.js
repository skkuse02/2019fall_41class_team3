const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());


const {
    getSession,
    searchUserId,
    findPassword,
    getUserCredit,
    addUserCredit,
    upsertUser,
    withdrawUserCredit,
    getMyQuestions,
    getMyAnswers
} = require('./user');

router.get('/session', getSession);
router.post('/id', searchUserId);
router.post('/password', findPassword);
router.get('/credit', getUserCredit);
router.get('/myQuestions', getMyQuestions);
router.get('/myAnswers', getMyAnswers);

router.post('/credit', addUserCredit);
router.post('/withdraw', withdrawUserCredit);
router.post('/',upsertUser);

module.exports = router;