function registrationController(req, res){
  User
   .create(req.body)
   .then( user =>
   res.redirect("/");
 })
   .catch ((err) => res.status(500).end());

}
