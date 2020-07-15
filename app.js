// load dependencies
const express = require('express'),
    path = require('path'),
    body = require('body-parser'),
    session = require('express-session'),
    Sequelize = require('sequelize');



// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// create db
const sequelize = new Sequelize('Info', 'root', 'password', {
    dialect: 'sqlite',
    storage: './models/db/session.sqlite'
});


// setup session-store with the database
const sessionStore = new SequelizeStore({
    db: sequelize
});


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
app.use(session({secret: "hello world! from Hooman",
    store: sessionStore,
    resave: false,
    saveUninitialized: false}));


// create/sync db
sessionStore.sync();


// use routers
app.use(routes);


// default view
app.use((req, res) => (res.render('./home/first_view',
    {isRegistered: req.session.isRegistered, isLoggedIn: req.session.isLoggedIn, userName: req.session.userName})));


// listening the port
app.listen(port, () => (console.log(`Listening on port ${port} ...`)));
