const express = require("express");
const router = express.Router();
const User = require("../models/user");

// @route  GET ‘/profile'
// @desct  display user information
// @access.  private
router.get("/profile", (req, res, next) => {
  const theUser = req.user;
  if (req.user._id) {
    User.findById(theUser._id)
      .then(response => {
        res.render("usersV/profile", { theUserInfo: response });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.redirect("/login");
  }
});

// @route  PUT ‘/profile'
// @desct  edit the info
// @access.  private
router.put("/profile/edit", (req, res, next) => {
  const theid = req.params.id;

  User.findByIdAndUpdate(theid, {
    username: username.req.body,
    email: email.req.body,
    resume: resume.req.body,
    coverLetter: coverLetter.req.body,
    followUpEmail: followUpEmail.req.body,
    username: username.req.body,
    password: hashPass.req.body
  })
    .then(response => {
      res.render("usersV/profile");
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect("/login");
});

// @route  DELETE ‘/profile'
// @desct  edit the info
// @access.  private
router.delete("/profile/delete/id", (req, res, next) => {
  const theid = req.params.id;
  User.findByIdAndRemove(theid)
    .then(response => {
      console.log(response);
      res.redirect("/signup");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
