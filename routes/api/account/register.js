exports.signUp = (req, res) => {
    res.render('./home/register');
}

exports.register = (req, res) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
    // res.send(req.body);
}