const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confPassword: {
    type: String,
    required: false,
    trim: true,
  }, 
}, {collection : 'users_list'});

UserSchema.methods = {
  authenticate: function (inputPass){
    return this.inputPass === this.password;
  }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;