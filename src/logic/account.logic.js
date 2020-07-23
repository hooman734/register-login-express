import { SHA3 } from 'sha3';
import { PASSWORD_HASH_SIZE, SALT } from '../constants';
import { findUser, addUser, existUserWithEmail } from '../dal/user.dal';

const hash = new SHA3(PASSWORD_HASH_SIZE);

const hashPassword = (password) => {
  hash.update(password.concat(SALT));
  return hash.digest('hex');
};

export class AccountLogic {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  async login(email, password) {
    
    if (!email) {
      throw new Error('Mail field is undefined!");
    }

    if (!password) {
      throw new Error('Password field is undefined!");
    }

    const result = await findUser(this.sequelize, {
      email,
      password: hashPassword(password),
    });

    if (result) {
      return result;
    }
    throw new Error('Failed to findOne');
  }

  async register(email, password) {

    if (!email) {
      throw new Error('Mail field is undefined!");
    }

    if (!password) {
      throw new Error('Password field is undefined!");
    }

    const emailAlreadyExist = await existUserWithEmail(this.sequelize, email);

    if (!emailAlreadyExist) {
      await addUser(this.sequelize, {
        email,
        password: hashPassword(password),
      });

      return true;
    }
    return false;
  }
}
