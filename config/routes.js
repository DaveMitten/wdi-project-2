const express  = require('express');
const router   = express.Router();

const register = require('../controller/registrationController');

router.get('/', (req, res) => res.render('statics/home'));

router.route('/register')
.get(register.new)
.post(register.create);

module.exports = router;
