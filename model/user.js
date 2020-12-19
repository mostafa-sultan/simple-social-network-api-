const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    about: String,
    location: String,
    phone: String,
    sex: String,
    age: String,
    imgurl: String,
    state: [{ postid: String,method: String }]
})

module.exports = mongoose.model("user", schema)