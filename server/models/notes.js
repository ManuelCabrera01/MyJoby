const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  content: String
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
