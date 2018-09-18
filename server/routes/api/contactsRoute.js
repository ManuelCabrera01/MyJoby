const express = require("express");
const router = express.Router();
const Jobs = require("../../models/job");

// @route  POST ‘api/example’
// @desct  create users
// @access.  public
router.post("/jobs/:id/contacts/create", (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "dude you need to log in in oreder to add a contact" });
    return;
  }
  Jobs.findByIdAndUpdate(req.params.id, { $push: { contacts: req.body } })

    .then(theJob => {
      res.json(theJob.contacts);
    })
    .catch(err => {
      next(err);
    });
});
router.post("/jobs/:id/contacts/delete/:contactIndex", (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "dude you have to login to delete a contact" });
    return;
  }
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
