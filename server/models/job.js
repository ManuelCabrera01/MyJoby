const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notes = require("./notes");
const Contacts = require("./contact");

const jobSchema = new Schema({
  company: String,
  companyDescritions: String,
  date: Date,
  position: String,
  location: String,
  positionDescriptions: String,
  applicationDate: { type: Date, default: Date.now },
  phoneNum: Number,
  notes: [{ type: Schema.Types.ObjectId, ref: "notes" }]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
