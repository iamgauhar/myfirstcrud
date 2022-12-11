const mongoose = require("mongoose")

const BlogModel = mongoose.model("blogs", mongoose.Schema({
    title: String,
    article: String,
    authorID: String
}))

module.exports = {BlogModel}