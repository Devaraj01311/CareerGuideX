const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No admin token provided" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid admin token" });
  }
};
