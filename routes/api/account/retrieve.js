// load dependency
const hash = require('object-hash');


// load model logic helper
const {push, query} = require('../../../models/logic/users');


// when method is GET
exports.signIn = (req, res, next) => {
    res.render('./home/signIn');
}


// when method is POST
exports.loggedIn = (req, res, next) => {
    let {email, pass} = req.body;
    pass = hash(pass + email);
    query(pass, (usr) => {
        req.session.userName = usr.userName;
        console.log('Welcome ', usr.userName);
    }, (e) => {
        if (!e) {
            req.session.isLoggedIn = true;
            res.render('./home/welcome', {isLoggedIn: req.session.isLoggedIn, userName: req.session.userName})
        } else {
            res.redirect('/');
        }
    }).then();

    // res.send(req.body);
}