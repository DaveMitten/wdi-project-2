const express       = require('express');
const router        = express.Router();

const registrations = require('../controller/registrationController');
const sessions      = require('../controller/usersessionController');
const workspace     = require('../controller/workspaceController');
// const registration = require('../controller/registrationController');
// const register = require('../controller/registrationController');

router.get('/', (req, res) => res.render('index'));

router.route('/workspaces')
  .get(workspace.index)
  .post(workspace.create);
router.route('/workspaces/:id')
  .get(workspace.show);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;
