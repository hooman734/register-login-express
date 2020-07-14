const express = require('express');
const router = express.Router();


router.get('/api/login', (req, res, next) => {
   res.render('login');
});

router.post('/api/login', (req, res, next) => {
   res.send(req.body);
});

module.exports = router;