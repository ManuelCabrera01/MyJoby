const express = require("express");
const router = express.Router();
const Contact = require("../../models/user");

router.post("/contact/add", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    console.log(Contact);
    Contact.create({ name: req.body.name })
      .then(response => {
        console.log(response);
        Job.findByIdAndUpdate(req.body._id, { $push: { contact: response } })
          .then(response => {
            console.log("user update -=-=", response);
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
