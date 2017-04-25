const User= require('../model/registration');

function sessionNew(req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res) {
  User
  .findOne({ email: req.body.email })
  .then((user) =>{
    if (!user || !user.validatePassword(req.body.password)) {
      req.flash('danger', 'Unknown email/password combination');
      return res.status(401).render('sessions/new', { message: 'Something entered wrong'});
    }

    req.session.userId = user.id;

    req.flash('info', `Welcome back, ${user.username}!`);
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
