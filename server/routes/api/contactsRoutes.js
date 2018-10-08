const express = require("express");
const router = express.Router();
const Contact = require("../../models/user");

router.post("/contact/add/:id", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Contact.create({
      name: req.body.name,
      phoneNumber: req.body.name,
      Email: req.body.name,
      Position: req.body.name,
      comment: req.body.name,
      touch: req.body.name
    })

      .then(response => {
        console.log("this is the response after creating a contact", response);
        Job.findByIdAndUpdate(req.params._id, {
          $push: { contacts: response._id }
        })
          .then(response => {
            console.log("user update -=-=", response);
            res.json(response);
          })
          .catch(err => {
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
