require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const User = require("./models/user");
const cors = require("cors");

mongoose
  .connect(
    "mongodb://localhost/myJoby",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
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

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user, { message: "You have successfully logged in" });
    });
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

//ROUTES
const index = require("./routes/api/index");
app.use("/api", index);

const notesRoutes = require("./routes/api/notesRoutes");
app.use("/api", notesRoutes);

const authRoutes = require("./routes/api/authRoutes");
app.use("/api", authRoutes);

const contactsRoutes = require("./routes/api/contactsRoutes");
app.use("/", contactsRoutes);

const profileRoutes = require("./routes/api/profileRoutes");
app.use("/api", profileRoutes);

const jobsRoutes = require("./routes/api/jobsRoutes");
app.use("/api", jobsRoutes);

module.exports = app;
