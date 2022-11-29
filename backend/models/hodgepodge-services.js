const mongoose = require("mongoose");
const hodgepodgeModel = require("./hodgepodge");
const dotenv = require("dotenv");


dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
// mongoose.set("debug", true);

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
  .catch((error) => console.log(error + "\n\nmongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PWD +
  "@" +
  process.env.MONGO_CLUSTER +
  "/" +
  process.env.MONGO_DB +
  "?retryWrites=true&w=majority"));

async function findHodgepodgeByName(name) {
    return await hodgepodgeModel.find({name: name});
}

async function findSimilarHodgepodgeName(name) {
  return await hodgepodgeModel.find({ name: { $regex: "^" + name, $options: 'i' } });
}

exports.findHodgepodgeByName = findHodgepodgeByName;
exports.findSimilarHodgepodgeName = findSimilarHodgepodgeName;