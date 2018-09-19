const express = require("express");
const router = express.Router();
const Jobs = require("../../models/job");

// @route  GET ‘api/jobs'
// @desct  display list pof jobs
// @access.  private
router.get("/jobs", (req, res, next) => {
  Jobs.find()
    .sort({ date: -1 })
    // UNCOMMENTS this two dude after you create your  notes and contatcs
    .then(allTheJobs => {
      console.log();
      res.json(allTheJobs);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route  GET ‘api/jobs/id'
// @desct  job detail
// @access.  private
router.get("/jobs/:id", (req, res, next) => {
  const id = req.params.id;
  Jobs.findById(id)
    .populate("contact")
    .then(theJob => {
      res.send({ theJob: theJob });
    })
    .catch(err => {
      next(err);
    });
});

// @route  POST ‘api/ceate'
// @desct  create new route
// @access.  private
router.post("/jobs/create", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "dude you have to login in order to add a new job aplication  "
    });
    return;
  }
  const {
    name,
    position,
    applicationDate,
    notes,
    phoneNum,
    contacts
  } = req.body;
  const newJob = new Jobs({
    name,
    position,
    applicationDate,
    notes,
    phoneNum,
    contacts
  });
  newJob
    .save()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route  POST ‘api/jobs/id/update'
// @desct  update a particular job
// @access.  private

router.post("/jobs/:id/update", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "dude you have to login in oreder to modify any joba aplication"
    });
    return;
  }
  Jobs.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    contact: req.body.contact,
    position: req.body.position,
    phoneNum: req.body.phoneNum
  })
    .then(theJob => {
      res.json(theJob);
    })
    .catch(err => {
      next(err);
    });
});
// @route  DELETE‘api/jobs/id/delete'
// @desct  delete a specific job
// @access.  private
router.delete("/jobs/:id/delete", (req, res, next) => {
  Jobs.findByIdAndRemove(req.params.id)
    .then(reponse => {
      res.json({ sucees: true });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
