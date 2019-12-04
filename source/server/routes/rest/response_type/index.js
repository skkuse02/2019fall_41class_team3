const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());


const {
    getResponseType
} = require('./response_type');

router.get('/', getResponseType);

module.exports = router;