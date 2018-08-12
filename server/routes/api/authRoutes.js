const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "_id", (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username: username,
      password: hashPass
    });

    theUser.save(err => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });

        return;
      }

      req.login(theUser, err => {
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "there is no user register under that name" });
      return;
    }

    if (!theUser) {
      res.status(401).json(err);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "your database is fuck dude" });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});
authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "see ya, Mah Dude" });
});
authRoutes.get("/loggedin", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "you need to login first" });
});

authRoutes.get("/private", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: "This is a private message" });
    return;
  }

  res.status(403).json({ message: "you are not authorize " });
});

module.exports = authRoutes;
// ///////