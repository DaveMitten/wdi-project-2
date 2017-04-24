const Workspace = require('../model/workspace');

function workspaceIndex(req, res) {
  Workspace
   .find()
   .exec()
   .then(workspace => {
     return res.render('workspace', { workspace });
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

module.exports = {
  index: workspaceIndex,
  show: workspaceShow,
  create: workspaceCreate
};
