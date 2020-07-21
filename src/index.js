// load dependencies
import express from 'express';
import body from 'body-parser';
import session from 'express-session';
import Sequelize from 'sequelize';
import { init } from './models/logic/users';

// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create db
let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize('Info', 'root', 'password', {
    dialect: 'sqlite',
    storage: './models/db/session.sqlite',
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

// import routes
const routes = require('./routes');

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

// sequelize.sync({ force: true });

// use routers
app.use(routes);

// default view
app.use((req, res) => res.render('./home/index', {
  isRegistered: req.session.isRegistered,
  isLoggedIn: req.session.isLoggedIn,
  userName: req.session.userName,
}));

app.use((req, res, next) => {
  req.sequelize = sequelize;
  next();
});

// listening the port
app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
