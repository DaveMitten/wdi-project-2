const express       = require('express');
const router        = express.Router();

const registrations = require('../controller/registrationController');
const sessions      = require('../controller/usersessionController');
const workspace     = require('../controller/workspaceController');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

router.get('/', (req, res) => res.render('statics/home'));

router.route('/workspaces')
  .get(workspace.index)
  .post(secureRoute, workspace.create);

router.route('/users/:id/workspaces')
  .get(workspace.my)
  .post(secureRoute, workspace.create);

router.route('/workspaces/new')
  .get(secureRoute, workspace.new);

router.route('/workspaces/:id')
  .get(workspace.show)
  .put(secureRoute, workspace.update)
  .delete(secureRoute, workspace.delete);

router.route('/workspaces/:id/edit')
  .get(secureRoute, workspace.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;
