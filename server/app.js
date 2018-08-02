require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const db = require("./config/keys").mongoURI;
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./config/passport");
// passportSetup(passport);

mongoose.Promise = Promise;
mongoose
  .connect(
    db
    // { useMongoClient: true }
  )
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "angular auth passport secret shh",
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 2419200000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"]
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// app.use((req, res, next) => {
//   res.sendfile(__dirname + "/public/index.html");
// });

// default value for title local
app.locals.title = "+++JOB+++";

//routing

const index = require("./routes/api/index");
app.use("/", index);

const authRoutes = require("./routes/api/authRoutes");
app.use("/api", authRoutes);

const jobsRoutes = require("./routes/api/jobsRoute");
app.use("/api", jobsRoutes);

const contasctsRoutes = require("./routes/api/contactsRoute");
app.use("/api", contasctsRoutes);

const notesRoutes = require("./routes/api/notesRoute");
app.use("/api", notesRoutes);

module.exports = app;
