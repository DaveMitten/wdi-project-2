const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser      = require('body-parser');
const User            = require('./model/registration');

//sits on top of mongdb to allow easier acces
const mongoose        = require('mongoose');
const session         = require('express-session');
//puts in a system to override natural ability of the program which allows us to put and push etc
const methodOverride  = require('method-override');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();
const flash           = require('express-flash');

mongoose.connect(env.db);

//embedded javascript allowing us to wrtie in html and create dynamic changing info.
app.set('view engine', 'ejs');
//creates a
app.set('views', `${__dirname}/views`);


app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());


app.use((req, res, next) => {
  if (!req.session.userId) return next();

  User
  .findById(req.session.userId)
  .then((user) => {
    if(!user) {
      return req.session.regenerate(() => {
        req.flash('danger', 'You must be logged in.');
        res.redirect('/');
      });
    }

    req.session.userId = user._id;

    res.locals.user = user;
    res.locals.isLoggedIn = true;

    next();
  });

});

app.use(router);
app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));
