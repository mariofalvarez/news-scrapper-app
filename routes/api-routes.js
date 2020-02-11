const express = require("express")
const router = express.Router()
const db = require("../models")

router.get("/all", (req, res) => {
  db.Article.find()
    .then(articles => {
      res.send(articles)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
