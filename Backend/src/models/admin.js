require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  _id: { type: String, default: process.env.ADMIN_ID }, 
  name: { type: String, default: "Admin" },
  email: { type: String, default: process.env.ADMIN_EMAIL, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Admin", adminSchema);
