require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./src/config/db"); 
const Admin = require("./src/models/admin");

(async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists:", existing._id);
      process.exit(0);
    }

    const admin = new Admin({
      password: process.env.ADMIN_PASSWORD, 
    });

    await admin.save();
    console.log("Admin created with _id:", admin._id);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
})();
