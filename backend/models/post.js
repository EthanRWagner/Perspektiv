const mongoose = require("mongoose");

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
  }
}, {collection : 'post_list'});



const Post = mongoose.model("Post", PostSchema);

module.exports = Post;