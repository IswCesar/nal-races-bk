const express = require("express");
const path = require("path");
var cors = require('cors')
require("dotenv").config();

// DB config
const { dbConnection } = require("./database/config");
dbConnection();

// Express app
const app = express();
app.use(cors())


// Read and parse http request
app.use(express.json());

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Public path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Our routes
app.use("/api/test", require("./routes/test"));
app.use("/api/question", require("./routes/question"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/reports", require("./routes/reports"))
app.use("/api/rooms", require("./routes/rooms"))


// Config
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(error);
    console.log("Servidor corriendo en puerto:", process.env.PORT);
});