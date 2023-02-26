const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// Create Schema
const ResultSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});
module.exports = Result = mongoose.model("student-scores", ResultSchema);