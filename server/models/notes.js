const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  content: String
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
