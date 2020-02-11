const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: "String is required"
  },
  summary: {
    type: String,
    required: "String is required"
  },
  url: {
    type: String,
    required: "String is required"
  },
  saved: {
    type: Boolean,
    default: false
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

const Article = mongoose.model("Article", ArticleSchema)

module.exports = Article
