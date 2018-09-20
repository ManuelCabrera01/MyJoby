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
authRoutes.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indicate a username and a password to log in"
    });
    return;
  }

  User.findOne({ username: username }, (err, user) => {
    if (err || !user) {
      res.render("auth/login", {
        errorMessage: "The username doesn't exist"
      });
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.redirect("/");
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect password"
      });
    }
  });
});

// @route  POST ‘/logout'
// @desct  logs users out
// @access.  private
authRoutes.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;
