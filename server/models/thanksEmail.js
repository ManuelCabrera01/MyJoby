const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const thankEmailSchema = new Schema({
content:String;
});

const ThankEmailSchema = mongoose.model("ThankEmailSchema", thankEmailSchema);

module.exports = ThankEmailSchema;