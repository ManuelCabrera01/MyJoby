const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: String,
  companyDescriptions: String,
  contacts: String,
  position: String,
  location: String,
  positionDescriptions: String,
  applicationDate: { type: Date, default: Date.now },
  phoneNum: Number,
  notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
