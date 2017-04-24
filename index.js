const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser      = require('body-parser');

//sits on top of mongdb to allow easier acces
const mongoose        = require('mongoose');
//puts in a system to override natural ability of the program which allows us to put and push etc
const methodOverride  = require('method-override');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();

mongoose.connect(env.db);

//embedded javascript allowing us to wrtie in html and create dynamic changing info.
app.set('view engine', 'ejs');
//creates a
app.set('views', `${__dirname}/views`);

// app.get('/', (req, res) => res.render('home'));

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

app.use(router);

app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));
