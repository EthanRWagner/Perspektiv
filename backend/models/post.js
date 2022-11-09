const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postBody: {
    type: String,
    required: true,
    trim: true,
  },
  userList: {
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