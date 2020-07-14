const express = require('express');
const router = express.Router();

// import api/account
const {signUp, register} = require('./api/account/register');
const {signIn, loggedIn} = require('./api/account/retrieve');


router.get('/api/register', signUp);

router.post('/api/register', register);

router.get('/api/login', signIn);

router.post('/api/login', loggedIn);

module.exports = router;