const express = require("express");
const router = express.Router();
const Contact = require("../../models/contact");
const Job = require("../../models/job");

// @route  POST ‘/contact/add/:id'
// @desct add contact info
// @access.  private
router.post("/contact/add/:id", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Contact.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      Email: req.body.Email,
      Position: req.body.Position,
      comment: req.body.comment,
      touch: req.body.touch
    })
      .then(response => {
        console.log(req.params.id);
        console.log("this is the response after creating a contact", response);
        Job.findByIdAndUpdate(req.params.id, {
          $push: { contacts: response._id }
        })
          .then(response => {
            console.log("job update -=-=", response);
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
    console.log("sup error");
    res.json("login");
  }
});

module.exports = router;
