// load dependency
const hash = require('object-hash');


// load model logic helper
const {push, query} = require('../../../models/logic/users');


// when method is GET
exports.signUp = (req, res) => {
    res.render('./home/register');
}


// when method is POST
exports.register = (req, res) => {
    let {email, pass, rePass} = req.body;
    if (pass === rePass) {
        req.session.isRegistered = true;
        const userName = email.split('@')[0];
        pass = hash(pass + email);
        push(userName, email, pass).then();
        res.redirect('/');
    } else {
        res.redirect('/');
    }

    // res.send(req.body);
}