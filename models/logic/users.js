const { Sequelize, Model, DataTypes } = require('sequelize');


// create db
const sequelize = new Sequelize('Users', 'root', 'password', {
    dialect: 'sqlite',
    storage: '../../models/db/users.sqlite'
});


// define class User
class User extends Model{}
User.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    password: DataTypes.STRING
}, {sequelize, modelName: 'user'});


// push new record
const push = async (userName, userEmail, password) => {
    await sequelize.sync();
    await User.create({
        userName,
        userEmail,
        password
    });
};


// retrieve a record
const query = async (password) => {
    // await sequelize.sync();
    let d = await User.findOne({
        where: {
            password
        }
    }, user => {
        return user.toJSON()
    });

    console.log('---->', d);
    return d;
};



push("Hooman", "hooman@gmail.com", "haha");
console.log('<----------', query("haha"));