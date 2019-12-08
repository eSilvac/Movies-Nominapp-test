const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 150,
    minlength: 5,
    required: [true, "is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "is required"]
  },
});

module.exports = mongoose.model('User', userSchema);
