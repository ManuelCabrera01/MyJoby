const express = require("express");
const router = express.Router();
const Jobs = require("../../models/job");

router.post("/jobs/:id/notes/create", (req, res, next) => {
  Jobs.findByIdAndUpdate(req.params.id, { $push: { notes: req.body } })

    .then(theJob => {
      res.json(theJob.notes);
    })
    .catch(err => {
      next(err);
    });
});
router.post("/jobs/:id/notes/delete/:noteIndex", (req, res, next) => {
  const jobID = req.params.id;
  const noteIndex = req.params.noteIndex;
  Jobs.findById(jobID)
    .then(theJob => {
      theJob.notes.splice(noteIndex, 1);
      theJob
        .save()
        .then(x => {
          res.json(theJob);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
