const mongoose = require("mongoose");

var today = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dd = today.getDate();
var mm = months[today.getMonth()]; //January is 0
var yyyy = today.getFullYear();

today = dd + ' ' + mm + ' ' + yyyy;

const PostSchema = new mongoose.Schema({
  url:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  hpList: {
    type: Array,
    require: true,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  date: {
    type: String,
    require: true,
    default: today,
  }
}, {collection : 'post_list'});



const Post = mongoose.model("Post", PostSchema);

module.exports = Post;