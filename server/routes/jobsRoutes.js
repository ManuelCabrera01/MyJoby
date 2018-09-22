const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const ensureLogin = require("connect-ensure-login");

// @route  POST ‘/jobs/add'
// @desct  create jobs
// @access.  public

router.post("/jobs/add", ensureLogin.ensureLoggedIn, (req, res, next) => {
  const {
    company,
    position,
    location,
    positionDescriptions,
    applicationDate,
    phoneNum,
    notes
  } = req.body;
  const newJob = new Job({
    company,
    companyDescriptions,
    date,
    position,
    location,
    positionDescriptions,
    applicationDate,
    phoneNum,
    notes
  });
  if (req.user._id) {
    job
      .create(newJob)
      .then(response => {
        res.render("jobsV/jobsList");
      })
      .catch(err => {
        next(err);
      });
  } else {
    res.redirect("/login");
  }
});
module.exports = router;

// @route  GET ‘/jobs'
// @desct  display list of jobs
// @access.  private
router.get("/jobs", (req, res, next) => {
  Job.find()
    .populate("contact")
    .populate("notes")
    .then(response => {
      console.log(response);
      res.render("jobsV/jobsList", { theList: response });
    })
    .catch(err => {
      next(err);
    });
});
