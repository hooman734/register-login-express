const express = require('express'),
    path = require('path'),
    body = require('body-parser'),
    session = require('express-session');


// import routes
const routes = require('./routes');


// initialize & settings port
app = express();
port = process.env.PORT || 4444;


// setup view engine
app.set('view engine', 'pug');
app.set('views', 'views');


// set static folder
app.use(express.static(path.resolve(__dirname, 'public')));


// setup body-parser
app.use(body.urlencoded({ extended: false }));


// setup session
app.use(session({secret: "hello world! from Hooman", resave: false, saveUninitialized: false}));


// use routers
app.use(routes);


// default view
app.use((req, res) => (res.render('./home/first_view', {isLoggedIn: req.session.isLoggedIn})));


// listening the port
app.listen(port, () => (console.log(`Listening on port ${port} ...`)));
