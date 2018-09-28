const express = require("express");
const router = express.Router();
const Job = require("../../models/job");
const User = require("../../models/user");

// @route  POST ‘/jobs/add'
// @desct  create jobs
// @access.  public

router.post("/jobs", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Job.create({
      companyDescriptions: req.body.companyDescriptions,
      position: req.body.position,
      location: req.body.location,
      url: req.body.url,
      positionDescriptions: req.body.positionDescriptions,
      applicationDate: req.body.applicationDate,
      phoneNum: req.body.phoneNum,
      notes: req.body.notes
    })
      .then(response => {
        User.findByIdAndUpdate(theUser._id, { $push: { jobs: response._id } })
          .then(response => {
            console.log("user update -=-=", theUser);
            res.json(response);
          })
          .catch(() => {
            res.json(err);
          });
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.json("response");
  }
});
module.exports = router;
