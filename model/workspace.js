const mongoose = require('mongoose');
const express  = require('express');


const workspaceSchema = new mongoose.Schema({
  name: { type: String, require: true },
  website: { type: String },
  description: { type: String, require: true }
  // location: need to add the info here for a map later
});

module.exports= mongoose.model('Workspace', workspaceSchema);
