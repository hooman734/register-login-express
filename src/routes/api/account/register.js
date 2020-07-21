// load dependency
import { SHA3 } from 'sha3';

// load model logic helper
import { push, init } from '../../../models/logic/users';
import { salt } from '../../../constants';

const hash = new SHA3(256);

// when method is GET
export function signUp(req, res) {
  res.render('./home/register');
}

// when method is POST
export function register(req, res) {
  const { sequelize } = req;
  init(sequelize);
  const { email, pass, rePass } = req.body;

  if (pass === rePass) {
    hash.update(`${pass}${salt}`);
    const hashedPassword = hash.digest('hex');
    req.session.isRegistered = true;
    push(sequelize, email.split('@')[0], email, hashedPassword);
    res.redirect('/');
  } else {
    // password confirmation did not match
    // TODO: send an error
  }
}
