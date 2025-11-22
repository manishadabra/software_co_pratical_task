const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  // username: String,
  email: String,
  password: String,
  status : {type: Boolean, default: true},
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
})

module.exports = mongoose.model('User', UserSchema);