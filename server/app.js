const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("./connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const { Server } = require("socket.io");
const { routesInit, corsAccessControl } = require("./routes/config_routes");

const app = express();

const server = http.createServer(app);

//the defualt is to sotre in memory sotre
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/foodzone",
  collection: "sessions",
});
store.on("error", function (error) {
  console.log(error);
});

// [[headers]]
//   # Define which paths this specific [[headers]] block will cover.
//   for = "/*"
//     [headers.values]
//     Access-Control-Allow-Origin = "https://foodiesira.netlify.app"



const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL, "https://foodiesira.netlify.app"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://foodiesira.netlify.app"],
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET, //sigh the cookie
    resave: false,
    saveUninitialized: false, //store session only if initialized
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 minutes
      sameSite: false,
      secure: false,
      httpOnly: false,
      //in production mode the cookies send only over htts
    },
    store: store,
  })
);
corsAccessControl(app);
routesInit(app);

let port = process.env.PORT;
server.listen(port, () => {
  console.log("listening on " + port);
});

module.exports = { app, io };

require("./socket/socket");

// app.use((req, res) => {
//   res.status(404).json({ msg_error: "Url not found , 404!" });
// });
