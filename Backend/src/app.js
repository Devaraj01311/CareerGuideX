require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");


const skillRoutes = require("./Routes/skillRoutes");
const jobRoutes = require("./Routes/jobRoutes");
const authRoutes = require("./Routes/authRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

require("./config/passport"); 

const app = express();

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/api/user", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("CarrerGuideX API Running");
});

module.exports = app;