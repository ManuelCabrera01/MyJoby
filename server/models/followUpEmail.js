const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followUpEmailSchema = new Schema({
  content: String
});

const FollowUpEmail = mongoose.model("FollowUpEmail", followUpEmailSchema);

module.exports = FollowUpEmail;
