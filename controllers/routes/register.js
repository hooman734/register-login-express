const express = require('express');
const router = express.Router();

// import logic
const _ = require('../logics/register');


router.get('/api/register', _.fillOut);

router.post('/api/register', _.register);

module.exports = router;