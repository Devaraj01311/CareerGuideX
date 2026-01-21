require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { initSocket } = require("./src/socket/socket");

connectDB();

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
