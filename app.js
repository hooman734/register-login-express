const express = require('express'),
    path = require('path'),
    body = require('body-parser');


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


// use routers
app.use(routes);


// default view
app.use((_, res) => (res.render('./home/first_view')));


// listening the port
app.listen(port, () => (console.log(`Listening on port ${port} ...`)));
