// load dependencies
import { DataTypes } from 'sequelize';
import { User } from '../models/User';

/**
 * Pushes new record
 * @param sequelize
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
export const addUser = async (sequelize, { email, password }) => {
  try {
    await User.create({
      email,
      password,
    });
    await sequelize.sync();
  } catch (err) {
    throw new Error('Failed to save the user into database');
  }
};

/**
 * Retrieve a record
 * @param sequelize
 * @param email
 * @param password
 * @returns {Promise<User>}
 */
export const findUser = async (sequelize, { email, password }) => {
  try {
    return await User.findOne({
      where: {
        email,
        password,
      },
    });
  } catch (err) {
    throw new Error('Failed to find the user');
  }
};

/**
 * Check if there is any user with given email
 * @param sequelize
 * @param email
 * @returns {Promise<boolean>}
 */
export const existUserWithEmail = async (sequelize, email) => (await User.count({
  where: {
    email,
  },
})) > 0;

export const init = (sequelize) => {
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { sequelize, modelName: 'user' });
};
