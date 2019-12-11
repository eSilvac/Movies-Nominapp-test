const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    maxlength: 100,
    minlength: 1,
    required: [true, "is required"]
  },
  movies: {
    type: [String]
  }
});

module.exports = mongoose.model('List', listSchema);
