exports.fillOut = (req, res) => {
    res.render('./home/register');
}

exports.register = (req, res) => {
    res.send(req.body);
}