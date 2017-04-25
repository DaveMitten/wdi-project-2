const Workspace = require('../model/workspace');

function workspaceIndex(req, res) {
  Workspace
   .find()
   .exec()
   .then(workspace => {
     return res.render('workspaces/index', { workspace });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });

}

function workspaceShow(req, res) {
  Workspace
  .findById(req.params.id)
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
    .create(req.body)
    .then(workspace => {
      if(!workspace) return res.render('error', { error: 'No workspace was created!' });
      return res.redirect('/workspaces');
    })
    .catch(err => {
      return res.render('error', { error: err});
    });

}

function workspaceEdit(req, res) {
  Workspace
   .findById(req.params.id)
   .exec()
   .then(workspace => {
     if (!workspace) {
       return res.render('error', { error: 'No workspaces found.' });
     }
     return res.render('workspaces/edit', { workspace });
   })
   .catch(err => {
     return res.render('error', { error: err });
   });
}


function workspaceNew(req, res){
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
  delete: workspaceDelete
};
