import { salt } from '../../../constants';

// load dependency
import { SHA3 } from 'sha3';

// load model logic helper
import { push, query } from '../../../models/logic/users';

const hash = new SHA3(256);

// when method is GET
export function signUp(req, res) {
  res.render('./home/register');
}

// when method is POST
export function register(req, res) {
  const { sequelize } = req;

  let { email, pass, rePass } = req.body;

  if (pass !== rePass) {
    // password confirmation did not match
    // TODO: send an error
  }
  //
  // req.session.isRegistered = true;

  hash.update(`${pass}${salt}`);
  const hashedPassword = hash.digest('hex');

  push(email, email, hashedPassword).then();
  res.redirect('/');
}
