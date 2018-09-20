const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const bcryptSalt = 10;

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
  const email = req.body.email;

  if (username === "" || password === "") {
    req.flash("error", "please specify a username and password to sign up");
    res.render("userV/signup", { message: req.flash("error") });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("userV/signup", { message: req.flash("error") });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({
        username: username,
        password: hashPass,
        email: email
      })
        .then(response => {
          res.redirect("/profile");
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
  res.render("usersV/logIn", { message: req.flash("error") });
});

// @route  POST ‘/login'
// @desct  allow access to the user
// @access.  public
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
    passReqToCallback: true
  })
  // console.log()
);

// @route  GET ‘/logout'
// @desct  logs users out
// @access.  private
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/login");
  });
});

module.exports = router;
