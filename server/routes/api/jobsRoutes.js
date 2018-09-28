const express = require("express");
const router = express.Router();
const Job = require("../../models/job");
const ensureLogin = require("connect-ensure-login");

// @route  GET ‘/jobs'
// @desct  display list of jobs
// @access.  private
router.get("/jobs", (req, res, next) => {
  Job.find()
    // .populate("contact")
    // .populate("notes")
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// @route  POST ‘/jobs/add'
// @desct  create jobs
// @access.  public

router.post("/jobs", (req, res, next) => {
  if (req.user._id) {
    Job.create({
      companyDescriptions: req.body.companyDescriptions,
      position: req.body.position,
      location: req.body.location,
      positionDescriptions: req.body.positionDescriptions,
      applicationDate: req.body.applicationDate,
      phoneNum: req.body.phoneNum,
      notes: req.body.notes
    })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.json("response");
  }
});
module.exports = router;
