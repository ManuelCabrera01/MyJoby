const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// @route  GET ‘/signup'
// @desct  create users
// @access.  public
router.get("/signup", (req, res, next) => {
  res.render("userV/signup");
});

// @route  POST ‘/signup'
// @desct  create users
// @access.  public
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    req.flash("error", "please specify a username and password to sign up");
    res.render("userViews/signup", { message: req.flash("error") });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("userViews/signup", { message: req.flash("error") });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({
        username: username,
        password: hashPass
      })
        .then(response => {
          res.redirect("/");
        })
        .catch(err => {
          res.render("usersV/signup");
        });
    })
    .catch(error => {
      next(error);
    });
});

// @route  GET ‘/login'
// @desct  display view
// @access.  public
router.get("/login", (req, res, next) => {
  res.render("userViews/login", { message: req.flash("error") });
});

// @route  POST ‘/login'
// @desct  allow access to the user
// @access.  public
router.post("/login", (req, res, next) => {
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
      res
        .status(200)
        .render("/profile", { theUser: req.user }, console.log("nice"));
    });
  })(req, res, next);
});

// @route  POST ‘/logout'
// @desct  logs users out
// @access.  private
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
