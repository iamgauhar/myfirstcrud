const mongoose = require("mongoose")

const UsersModel = mongoose.model("users", mongoose.Schema({
    name: String,
    username: {type: String, unique: true},
    password: String,
}))

module.exports = {UsersModel}
