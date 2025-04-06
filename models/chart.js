const mongoose = require("mongoose");

const eduSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
});
const edu = mongoose.model("edu", eduSchema);
module.exports = edu;
