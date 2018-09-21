const express = require("express");
const router = express.Router();
const User = require("../models/user");
const ensureLogin = require("connect-ensure-login");

router.post("/jobs/add", ensureLogin.ensureLoggedIn, (req, res, next) => {
  const {
    company,
    companyDescritions,
    date,
    position,
    location,
    positionDescriptions,
    applicationDate,
    phoneNum,
    notes
  } = req.boby;
  const newJob = new Job({
    company,
    companyDescritions,
    date,
    position,
    location,
    positionDescriptions,
    applicationDate,
    phoneNum,
    notes
  });

  job
    .create(newJob)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;

router.get("/bojs", ensureLogin.ensureLoggedIn, (req, res, next) => {
  Job.find().then(response => {});
});
