const express = require("express");
const router = express.Router();
const Job = require("../../models/job");

router.post("/note/add", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Note.create({ content: req.body.content })
      .then(response => {
        Job.findByIdAndUpdate(req.body._id, { $push: { notes: response } })
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
module.exports = router;
