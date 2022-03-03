const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let signSchema = new Schema({
  zodiac: { type: String },
  number: { type: Number },
  traits: { type: String},
  element: { type: String },
  month: { type: String },
  inLuck: { type: Boolean },
});

module.exports = mongoose.model("Signs", signSchema);
