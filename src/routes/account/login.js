// load dependency
import { AccountLogic } from '../../logic/account.logic';

// when method is GET
export const handleLoginGet = (req, res) => res.render('account/login');

// when method is POST
export const handleLoginPost = async (req, res) => {
  const { sequelize, logger } = req;
  const { email, password } = req.body;

  const service = new AccountLogic(sequelize);

  try {
    const { dataValues: user } = await service.login(email, password);

    req.session.user = user;
    req.session.isLoggedIn = true;

    return res.redirect('/welcome');
  } catch (err) {
    logger.error(err.message);
    return res.render('account/login', { error: 'Failed to login in' });
  }
};
