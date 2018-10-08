const express = require("express");
const router = express.Router();
const Note = require("../../models/notes");
const Job = require("../../models/job");

// @route  POST ‘/note/add'
// @desct add jobs
// @access.  private

router.post("/notes/add/:id", (req, res, next) => {
  const theUser = req.user;
  if (theUser._id) {
    Note.create({
      content: req.body.content
    })
      .then(response => {
        console.log(response);
        // console.log(Job);
        // console.log(req.params.id);
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

// router.post("/job/add", (req, res, next) => {
//   const theUser = req.user;
//   if (theUser._id) {
//     console.log(Job);
//     Job.create({
//       companyDescriptions: req.body.companyDescriptions
//     })
//       .then(response => {
//         User.findByIdAndUpdate(theUser._id, { $push: { jobs: response._id } })
//           .then(response => {
//             console.log("user update -=-=", theUser);
//             res.json(response);
//           })
//           .catch(() => {
//             res.json(err);
//           });
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   } else {
//     res.json("login");
//   }
// });

module.exports = router;
