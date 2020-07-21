// load dependency
import { SHA3 } from 'sha3';

// load model logic helper
import { query } from '../../../models/logic/users';
import { salt } from '../../../constants';

const hash = new SHA3(256);
// when method is GET
export function signIn(req, res) {
  res.render('./home/signIn');
}

// when method is POST
export function loggedIn(req, res) {
  const { sequelize } = req;
  const { pass } = req.body;
  hash.update(`${pass}${salt}`);
  const hashedPassword = hash.digest('hex');
  try {
    query(sequelize, hashedPassword, (usr) => {
      req.session.userName = usr.userName;
      console.log('Welcome ', usr.userName);
    }, (e) => {
      if (!e) {
        req.session.isLoggedIn = true;
        res.render('./home/welcome', { isLoggedIn: req.session.isLoggedIn, userName: req.session.userName });
      } else {
        req.session.isLoggedIn = false;
        res.redirect('/');
      }
    });
  } catch (err) {
    console.log(err);
  }
  // res.send(req.body);
}

// when method is GET
export function loggedOut(req, res) {
  req.session.isLoggedIn = false;
  req.session.isRegistered = false;
  req.session.destroyed;
  res.render('./home/first_view');
}
