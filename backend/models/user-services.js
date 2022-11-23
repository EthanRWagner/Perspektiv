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

// async function getUsers(username, email) {
//   let result;
//   if (username === undefined && email === undefined) {
//     result = await userModel.find();
//   } else if (username && !email) {
//     result = await findUserByUserName(username);
//   } else if (email && !username) {
//     result = await findUserByEmail(email);
//   } else {
//     result = await findUserByUserNameAndEmail(username, email);
//   }
//   return result;
// }

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// async function addUser(user) {
//   try {
//     const userToAdd = new userModel(user);
//     const savedUser = await userToAdd.save();
//     return savedUser;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}


async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

// async function findUserByUserNameAndEmail(username, email) {
//   return await userModel.find({ username: username, email: email });
// }

// async function deleteUser(id) {
//   return await userModel.findByIdAndDelete(id);
// }

async function joinHP(username, hp) {
  return await userModel.updateOne({username : username}, {$push:{hpList: hp}});
}

async function changeUsername(username, newUsername){
  return await userModel.updateOne({username : username}, {$set:{username: newUsername}});
}


async function changeEmail(username, newEmail){
  return await userModel.updateOne({username : username}, {$set:{email: newEmail}});
}


async function changePassword(username, password){
  return await userModel.updateOne({username : username}, {$set:{password: password, confPassword: password}});
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }




//exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByUserName = findUserByUserName;
exports.findUserByEmail= findUserByEmail;
//exports.addUser = addUser;
//exports.deleteUser = deleteUser;
exports.joinHP = joinHP;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.changeUsername = changeUsername;
// exports.disconnectDB = disconnectDB;
