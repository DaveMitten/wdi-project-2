
//mongoose allows to connect to the database we created in terminal.
const mongoose  = require('mongoose');
//gives us more promises taht we can use in conjunction with mongoose
mongoose.Promise = require('bluebird');
//the envelope is the system that trasposrt our files to browser and connect up the database to mongoose????ask about this.
const env       = require('../config/env');
//requiring the models in our seeds
const Workspace = require('../model/workspace');

mongoose.connect(env.db, () => {
  //this will only appear when you use your forrm to enter into the shap of the model will be sorted out by the controller
  console.log('connected');

});

Workspace.collection.drop();

Workspace
.create([
  {
    name: 'TEST DB/SEEDS',
    website: 'http://www.coffeerepublic.co.uk/',
    description: 'test test test test'
  }
])
.then(workspaces => {
  console.log(`you\'ve created lovely workspaces amounting toooooo = ${workspaces.length}`);
})
.catch(err =>{
  console.log(`Error: ${err}`);
})
.finally(() => {
  mongoose.connection.close();
});
