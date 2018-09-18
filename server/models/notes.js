const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
content = String,


})
const Note = mongoose.model("Notes", noteScheman);
module.export = Note;