const express = require("express");
const router = express.Router();
const Jobs = require("../../models/job");

// DISPLAY YOUR LIST OF JOBS
router.get("/jobs", (req, res, next) => {
  Jobs.find()
    .sort({ date: -1 })
    // UNCOMMENTS this two dude after you create your  notes and contatcs
    // .populate(notes)
    // .populate(Conatacts)
    .then(allTheJobs => {
      res.json(allTheJobs);
    })
    .catch(err => {
      res.json(err);
    });
});
//SINGLE JOB POPULATED WITH ITS OWN CONTACTS

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

// CREATED A SINGLE JOB
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

//UPDATE A SINGLE JOB

router.post("/jobs/:id/update", (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({
        message:
          "dude you have to login in oreder to modify any joba aplication"
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

router.post("/jobs/:id/delete", (req, res, next) => {
  Jobs.findByIdAndRemove(req.params.id)
    .then(reponse => {
      res.json({ sucees: true });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
