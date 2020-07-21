// load dependencies
const { Model, DataTypes } = require('sequelize');

// define class User
class User extends Model {}

// push new record
exports.push = async (sequelize, userName, userEmail, password) => {
  await sequelize.sync({ force: true });
  try {
    await User.create({
      userName,
      userEmail,
      password,
    });
    await sequelize.sync();
  } catch (err) {
    console.log(err);
  }
};

// retrieve a record
exports.query = async (sequelize, password, callback, error) => {
  await sequelize.sync();
  try {
    const d = await User.findOne({
      where: {
        password,
      },
    });
    await callback(d.toJSON());
    await error(false);
  } catch (err) {
    await callback({ userName: 'NULL', userEmail: 'NULL', password: 'NULL' });
    await error(true);
  }
};

exports.init = (sequelize) => {
  User.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { sequelize, modelName: 'user' });
};
