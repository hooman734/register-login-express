// when method is GET
export const handleLogoutGet = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
