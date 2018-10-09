const express = require("express");
const router = express.Router();
const Note = require("../../models/notes");
const Job = require("../../models/job");

// @route  POST ‘/note/add/:id'
// @desct add notes
// @access.  private

router.post("/notes/add/:id", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Note.create({
      content: req.body.content
    })
      .then(response => {
        console.log(req.params.id);
        Job.findByIdAndUpdate(req.params.id, {
          $push: { notes: response._id }
        })
          .then(response => {
            console.log("-=-=-=-=-=-=-=--", response);
            res.json(response);
          })
          .catch(err => {
            console.log(err);
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

module.exports = router;
