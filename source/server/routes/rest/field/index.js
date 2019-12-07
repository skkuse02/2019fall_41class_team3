const aa = require('express-async-await');
const express = require('express');

const router = aa(express.Router());

async function auth(req, res, next){
    if(req.session.user) return next();
    else res.status(401).send({
        result: false,
        msg: "Not authorized"
    });
}

const {
    getFields,
    addField
} = require('./field');

router.get('/list', getFields);
router.post('/', addField);

module.exports = router;