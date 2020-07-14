exports.signIn = (req, res, next) => {
    res.render('./home/signIn');
}

exports.loggedIn = (req, res, next) => {
    res.send(req.body);
}