const express = require("express");
const router = express.Router();
const User = require("../../models/user");

// @route  GET ‘/profile'
// @desct  display user information
// @access.  private
router.get("/profile", (req, res, next) => {
  const theUser = req.user;
  if (req.user._id) {
    User.findById(theUser._id)
      .populate("jobs")
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.redirect("/login");
  }
});

// @route  PUT ‘/profile'
// @desct  edit the info
// @access.  private
router.put("/profile/:id/edit", (req, res, next) => {
  const theid = req.params.id;

  User.findByIdAndUpdate(theid, {
    username: req.body.username,
    email: req.body.email,
    resume: req.body.resume,
    coverLetter: req.body.coverLetter,
    followUpEmail: req.body.followUpEmail
  })
    .then(response => {
      res.json(response);
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
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
