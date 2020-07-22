// load dependency
import { AccountLogic } from '../../logic/account.logic';

// when method is GET
export const handleRegisterGet = (req, res) => res.render('account/register');

// when method is POST
export const handleRegisterPost = async (req, res) => {
  const { sequelize, logger, body: { email, password, passwordConfirmation } } = req;

  if (password !== passwordConfirmation) {
    logger.error('passwords did not match');
    return res.render('account/register', { error: 'password and password confirmation do not match' });
  }

  const service = new AccountLogic(sequelize);

  try {
    await service.register(email, password);

    req.session.user = { email };
    return res.redirect('/login');
  } catch (e) {
    logger.error(e.message);
    return res.render('account/register', { error: 'something went wrong while saving the user' });
  }
};
