const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());


const {
    getSession,
    searchUserId,
    findPassword,
    getUserCredit
} = require('./user');

router.get('/session', getSession);
router.get('/id', searchUserId);
router.get('/password', findPassword);
router.get('/credit', getUserCredit);

module.exports = router;