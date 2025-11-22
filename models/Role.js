const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleName: String,
  accessModules: [String],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Role', RoleSchema);