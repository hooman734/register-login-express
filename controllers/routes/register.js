const express = require('express');
const router = express.Router();

router.get('/api/register', (req, res, next) => {
    res.render('register');
});

router.post('/api/register', (req, res, next) => {
    res.send(req.body);
});

module.exports = router;