const mongoose = require("mongoose");
const postModel = require("./post");
const dotenv = require("dotenv");
const Post = require("./post");

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

  async function getPosts() {
    return await postModel.find();
  }

  async function updateHP(url, hp) {
    return await postModel.updateOne({url : url}, {$push:{hpList: hp}});
  }
  async function addComment(url,username, comment){
    return await postModel.updateOne({url: url}, {$push: {comments: {username: username, comment: comment}}});
  }

exports.getPosts = getPosts;
exports.updateHP = updateHP;
exports.addComment = addComment;