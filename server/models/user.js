const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  resume: String,
  email: String,
  jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
