// load dependencies
import express from 'express';
import body from 'body-parser';
import session from 'express-session';
import Sequelize from 'sequelize';
import ulog from 'ulog';

import routes from './routes';
import { init } from './dal/user.dal';

// Initialize a logger instance
const logger = ulog('application-logger');

// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create db
let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize('Info', 'root', 'password', {
    dialect: 'sqlite',
    storage: 'db/db.sqlite',
    logging: true,
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

// setup session-store with the database
const sessionStore = new SequelizeStore({
  db: sequelize,
});
// initialize & settings port
const app = express();
const port = process.env.PORT || 3000;

// setup view engine
app.set('view engine', 'pug');
app.set('views', 'views');

// set static folder
app.use(express.static('public'));

// setup body-parser
app.use(body.urlencoded({ extended: false }));

// setup session
app.use(
  session({
    secret: 'hello world! from Hooman',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);

// create/sync db
sessionStore.sync();
init(sequelize);

sequelize.sync({ force: false });

// Middleware
app.use((req, res, next) => {
  req.sequelize = sequelize;
  req.logger = logger;
  next();
});

// use routers
app.use('/', routes);

/**
 * Guard that makes sure user is logged in before continuing further
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const ensureLoggedIn = (req, res, next) => {
  const { isLoggedIn } = req.session;

  if (isLoggedIn) {
    return next();
  }
  return res.redirect('/');
};

// TODO: log every route with a middleware
// log before going to the route
// call next()
// log after going to the route
app.use((req, res, next) => { });

// default view
app.get('/', (req, res) => {
  const { user: { email = '' } = {}, isLoggedIn = false } = req.session;

  return res.render('index', { email, isLoggedIn });
});

app.get('/welcome', [ensureLoggedIn], (req, res) => {
  const { user: { email = '' } = {} } = req.session;

  return res.render('welcome', { email });
});

// listening the port
app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
