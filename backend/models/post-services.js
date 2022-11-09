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

  async function updatePost(oldBody, newBody) {
    return await postModel.updateOne({postBody : oldBody}, {$set:{postBody: newBody}});
  }
  async function addComment(postBody,comment){
    console.log(comment);
    return await postModel.updateOne({postBody: postBody}, {$push: {comments: comment}});
  }

exports.updatePost = updatePost;
exports.addComment = addComment;