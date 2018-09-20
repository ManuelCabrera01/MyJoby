const express = require("express");
const router = express.Router();

// @route  GET ‘/profile'
// @desct  display user information
// @access.  private
router.get("/profile", (req, res, next) => {
  if (req.session.currentUser) {
    res.render("usesV/profile");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
