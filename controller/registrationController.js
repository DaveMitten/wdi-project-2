const User = require('../model/registration');

function registrationNew(req, res){
  return res.render('register/new');
}


function registrationCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login`);
      return res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registration/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
