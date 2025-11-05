const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String }, // <-- added for Google login users
});

const User = mongoose.model("User", userSchema);

module.exports = User;
