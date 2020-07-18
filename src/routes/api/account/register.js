// load dependency
const {sha3} = require('sha3');


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
    sha3.update(pass);
    pass = sha3.digest();
    push(userName, email, pass).then();
    res.redirect('/');
  } else {
    res.redirect('/');
  }

  // res.send(req.body);
}