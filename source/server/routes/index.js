const express = require('express');
const router = express.Router();

router.use('/rest', require('./rest/'));
router.use('/rest/user', require('./rest/user'));
router.use('/rest/question', require('./rest/question'));
router.use('/rest/field', require('./rest/field'));
router.use('/rest/response_type', require('./rest/response_type'));
router.use('/rest/answer', require('./rest/answer'));

module.exports = router;