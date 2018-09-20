const express = require("express");
const router = express.Router();

// @route  GET ‘/profile'
// @desct  display user information
// @access.  private
router.get("/profile", (req, res, next) => {
  res.render("usesV/profile");
});

module.exports = router;
