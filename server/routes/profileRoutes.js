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

module.exports = router;
