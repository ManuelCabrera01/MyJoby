const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  resume: String,
  imgName: String,
  imgPath: String,
  jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  originalName: String,
  email: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
