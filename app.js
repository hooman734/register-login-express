const express = require('express'),
    path = require('path'),
    body = require('body-parser');


// import custom modules
const register = require('./controllers/routes/register'),
    retrieve = require('./controllers/routes/retrieve');


// initialize & settings port
app = express();
port = process.env.PORT || 4444;


// setup view engine
app.set('view engine', 'pug');
app.set('views', 'views/home');


// set static folder
app.use(express.static(path.resolve(__dirname, 'public')));


// setup body-parser
app.use(body.urlencoded({ extended: false }));


// use routers
app.use(register);
app.use(retrieve);


// default view
app.use((_, res) => (res.render('first_view')));


// listening the port
app.listen(port, () => (console.log(`Listening on port ${port} ...`)));
