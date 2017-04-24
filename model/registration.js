const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');


//this allows me to create a user creation page
//do i want more info here? Like address?? does taht matter hor this specific project ???
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }



});
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !==
this.password) {
    this.invalidate('passwordConfirmation', 'Something does not match...');
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
