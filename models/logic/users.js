// load dependencies
const { Sequelize, Model, DataTypes } = require('sequelize');


// create db
const sequelize = new Sequelize('Users', 'root', 'password', {
    dialect: 'sqlite',
    storage: '../db/users.sqlite'
});


// define class User
class User extends Model{}
User.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    password: DataTypes.STRING
}, {sequelize, modelName: 'user'});


// push new record
exports.push = async (userName, userEmail, password) => {
    await sequelize.sync({force: true});
    await User.create({
        userName,
        userEmail,
        password
    });
    await sequelize.sync();
};


// retrieve a record
exports.query = async (password, callback, error) => {
    await sequelize.sync();
    try {
        let d = await User.findOne({
            where: {
                password
            }
        });
        callback(d.toJSON());
        error(false);
    } catch (e) {
        callback({userName: 'NULL', userEmail: 'NULL', password: 'NULL'});
        error(true);
    }
};


// test functions
push("Hooman", "hooman@gmail.com", "hahaa");
query("hahaa", (user) => (console.log("userEmail =>", user.userEmail)), (e) => (console.log('error => ', e)));