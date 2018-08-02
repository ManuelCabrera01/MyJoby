const express = require("express");
const router = express.Router();
const Jobs = require("../../models/job");

router.post("/jobs/:id/contacts/create", (req, res, next) => {
  Jobs.findByIdAndUpdate(req.params.id, { $push: { contacts: req.body } })

    .then(theJob => {
      res.json(theJob.contacts);
    })
    .catch(err => {
      next(err);
    });
});
router.post("/jobs/:id/contacts/delete/:contactIndex", (req, res, next) => {
  const jobID = req.params.id;
  const contactIndex = req.params.contactIndex;
  Jobs.findById(jobID)
    .then(theJob => {
      theJob.contacts.splice(contactIndex, 1);
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
