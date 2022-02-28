const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name:
        {
            type: String,
            require: true,
            min: 2,
            max: 100
        },
        email:
        {
            type: String,
            require: true,
            min: 10,
            max: 100
        },
        password:
        {
            type: String,
            require: true,
            min: 10,
            max: 100
        },
        date:
        {
            type: Date,
            default: Date.now
        }
    }

)

module.exports = mongoose.model("user", userSchema);