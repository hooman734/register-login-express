exports.fillOut = (req, res, next) => {
    res.render('./home/login');
}

exports.login = (req, res, next) => {
    res.send(req.body);
}