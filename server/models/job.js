const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Notes = require("./notes");
const Contacts = require("./contacts");

const jobSchema = new Schema({
  name: String,
  position: String,
  applicationDate: { type: Date, default: Date.now },
  phoneNum: Number,
  notes: [{ type: ObjectId, ref: "Notes" }],
  contacts: [{ type: ObjectId, ref: "Contacts" }]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
