exports.signUp = (req, res) => {
    app.set("didRegister", "true");
    res.render('./home/register');
}

exports.register = (req, res) => {
    console.log("----->", app.get("didRegister"));
    res.send(req.body);
}