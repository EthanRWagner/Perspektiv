const mongoose = require("mongoose");

const HodgepodgeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  }
}, {collection : 'hodgePodge_list'});



const Hodgepodge = mongoose.model("Hodgepodge", HodgepodgeSchema);

module.exports = Hodgepodge;