const mongoose = require("mongoose")

const schema = mongoose.Schema({
    titel: String,
    description: String,
    username: String,
    going: Number,
    interest: Number,
    date: { type: Date, default: Date.now },
    comments: [{ username: String,comment: String }]
})

module.exports = mongoose.model("post", schema)