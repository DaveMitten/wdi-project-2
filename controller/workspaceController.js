const Workspace = require('../model/workspace');
// const workspace = new Workspace(req.body);
// workspace.user = req.user._id;
const User      = require('../model/registration');

function workspaceIndex(req, res) {
  Workspace
   .find()
   .exec()
   .then(workspace => {
     return res.render('workspaces/index', { workspace, title: 'All workspaces' });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });
}

function workspaceMyIndex(req, res) {
  Workspace
   .find({
     user: res.locals.user._id
   })
   .exec()
   .then(workspace => {
     return res.render('workspaces/index', { workspace, title: 'My workspaces' });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });
}

function workspaceShow(req, res) {
  Workspace
  .findById(req.params.id)
  .populate('user')
  .exec()
  .then(workspace => {
    if(!workspace){
      return res.render('error', { error: 'No workspace found!'});
    }
    return res.render('workspaces/show', { workspace });
  })
  .catch(err => {
    return res.render('error', { error: err });
  });
}

function workspaceCreate(req, res) {
  Workspace
    .create({
      name: req.body.name,
      website: req.body.website,
      description: req.body.description,
      user: res.locals.user._id,
      image: req.body.image
    })
    .then(workspace => {
      User.findById(res.locals.user._id)
      .exec()
      .then(user => {
        console.log(user);
        user.workspaces.push(workspace.id);
        user.save();
        console.log(user);
      });
      if(!workspace) return res.render('error', { error: 'No workspace was created!' });
      User.findById(req.session.userId).exec().then(userF => {
        userF.workspaces.push(workspace);
      });
      return res.redirect('/workspaces');
    })
      ///so i need to now .push the newly created workspace to the array (objectId)  that is created with the user model schema.
    .catch(err => {
      return res.render('error', { error: err});
    });
}

function workspaceEdit(req, res) {
  Workspace
   .findById(req.params.id)
   .exec()
   .then(workspace => {
     if (User.id !== Workspace.user) {
       return res.render('error', { error: 'Not eligible for edit.' });
     } else if (!workspace) {
       return res.render('error', { error: 'No workspaces found.' });
     }
     User.findById();
     return res.render('workspaces/edit', { workspace });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });
}


function workspaceNew(req, res){
  // User.findById(req.session.userId).exec().then(user => {
  //   // console.log(user, '*******************************')
  // });
  return res.render('workspaces/new');
}


function workspaceUpdate(req, res) {
  Workspace
    .findById(req.params.id)
    .exec()
    .then(workspace => {
      if (!workspace) {
        return res.render('error', { error: 'No workspace found.' });
      }
      for (const field in req.body) {
        workspace[field] = req.body[field];
      }
      return workspace.save();
    })
    .then(workspace => {
      if (!workspace) {
        return res.render('error', { error: 'Something went wrong during the update.' });
      }
      return res.render('workspaces/show', { workspace });
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}
function workspaceDelete(req, res) {
  Workspace
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      if (Workspace.user !== req.user.id) {
        console.log(req.user.id);
        return res.render('error', { error: 'Not elible for edit.' });
      }
      return res.redirect('/workspaces');
    })
    .catch(err => {
      return res.render('error', { error: err });
    });
}

module.exports = {
  index: workspaceIndex,
  show: workspaceShow,
  new: workspaceNew,
  create: workspaceCreate,
  edit: workspaceEdit,
  update: workspaceUpdate,
  delete: workspaceDelete,
  my: workspaceMyIndex
};
