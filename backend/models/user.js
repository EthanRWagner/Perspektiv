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
  },
  username: {
    type: String,
    required: true,
    trim: true,
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

const User = mongoose.model("User", UserSchema);

module.exports = User;