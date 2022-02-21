const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let signSchema = new Schema (
    {
        zodiac: {type: String},
        number: {type: Number},
        element: {type: String},
        month: {type: String},
        inLuck: {type: Boolean}
    }
);

module.expert = mongoose.model("sign", signSchema);