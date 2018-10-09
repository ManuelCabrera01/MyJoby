const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coverlleterSchema = new Schema({
  content: req.body.content
});

const CoverLetter = mongoose.model("CoverLetter", coverlleterSchema);

module.exports = CoverLetter;
