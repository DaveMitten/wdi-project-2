const User = require('../model/registration')

function registrationNew(req, res){
  return res.render('registration/new');
}



function registrationController(req, res){
  User
   .create(req.body)
   .then(user =>
   res.redirect('/')
 )
   .catch((err) => res.status(500).end());

}
