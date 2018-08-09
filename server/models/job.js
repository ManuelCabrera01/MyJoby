const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  name: String,
  position: String,
  applicationDate: { type: Date, default: Date.now },
  phoneNum: Number,
  notes: [
    {
      tittle: String,
      content: String
    }
  ],
  contacts: [
    {
      name: String,
      company: String,
      position: String,
      phoneNum: Boolean,
      email: String,
      touch: Boolean,
      comment: String
    }
  ]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
