const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: "Title is required"
  },
  summary: {
    type: String
  },
  link: {
    type: String
  },
  saved: {
    type: Boolean,
    default: false
  },
  comments: {
    type: [Schema.Types.String],
    default: []
  }
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article