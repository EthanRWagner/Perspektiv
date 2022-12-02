const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv");
const User = require("./user");

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
// find user by id
async function findUserById(id) {
  return await userModel.findById(id);
 
}
//find user by username
async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}
// find user with the similar first part of the user's input
async function findSimilarUsername(username) {
  return await userModel.find({ username: { $regex: "^" + username, $options: 'i' } });
}
// find user by email
async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}
// add hp to hpList of user
async function joinHP(username, hp) {
  return await userModel.updateOne({username : username}, {$push:{hpList: hp}});
}
// change username of that user
async function changeUsername(username, newUsername){
  return await userModel.updateOne({username : username}, {$set:{username: newUsername}});
}

// change email of the user
async function changeEmail(username, newEmail){
  return await userModel.updateOne({username : username}, {$set:{email: newEmail}});
}

// change password and confPassword of user
async function changePassword(username, password){
  return await userModel.updateOne({username : username}, {$set:{password: password, confPassword: password}});
}

exports.findUserById = findUserById;
exports.findUserByUserName = findUserByUserName;
exports.findUserByEmail= findUserByEmail;
exports.joinHP = joinHP;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.changeUsername = changeUsername;
exports.findSimilarUsername = findSimilarUsername;
