const User= require('../model/registration');

function sessionNew(req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res) {
  User
  .findOne({ email: req.body.email })
  .then((user) =>{
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).render('sessions/new', { message: 'Something entered wrong'});
    }
    return res.redirect('/');
  });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}


module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionsDelete
};
