const express = require('express');
const router = express.Router();

// import logic
const _ = require('../logics/retrieve');


router.get('/api/login', _.fillOut);

router.post('/api/login', _.login);

module.exports = router;