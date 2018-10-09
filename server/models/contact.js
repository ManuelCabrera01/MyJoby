const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactScheman = new Schema({
  name: String,
  phoneNumber: String,
  Email: String,
  Position: String,
  comment: String,
  touch: Boolean
});
const Contacts = mongoose.model("Contacts", contactScheman);

module.exports = Contacts;
