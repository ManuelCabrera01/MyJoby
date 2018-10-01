const express = require("express");
const router = express.Router();
const Job = require("../../models/job");
const User = require("../../models/user");

// @route  Get ‘/jobs'
// @desct  desplay all jobs
// @access.  private

router.delete("/jobs/:id", (req, res, next) => {
  Job.find()
    .then(response => {
      res.json({
        message: `Task with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route  POST ‘/jobs/add'
// @desct  create jobs
// @access.  public

router.post("/job/add", (req, res, next) => {
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
    res.json("login");
  }
});

// @route  PUT ‘job/update/:id'
// @desct  update jobs
// @access.  private
router.put("/job/update/:id", (req, res, next) => {
  theId = req.params.id;
  Job.findByIdAndUpdate(theId, {
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
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route  DELETE ‘/jobs/id'
// @desct  delete jobs
// @access.  private

router.delete("/jobs/:id", (req, res, next) => {
  Job.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Task with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
