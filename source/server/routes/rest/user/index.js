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
    withdrawUserCredit
} = require('./user');

router.get('/session', getSession);
router.get('/id', searchUserId);
router.get('/password', findPassword);
router.get('/credit', getUserCredit);

router.post('/credit', addUserCredit);
router.post('/withdraw', withdrawUserCredit);
router.post('/',upsertUser);

module.exports = router;