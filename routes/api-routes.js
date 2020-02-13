const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
const cheerio = require("cheerio")

router.get("/scrapped", (req, res) => {
  axios.get("https://www.nytimes.com").then(urlResponse => {
    let $ = cheerio.load(urlResponse.data)

    $("div._1OVBBWLtHoSPfGCRaPzpTf").each((i, element) => {
      const result = { headline, summary, urlLink }

      headline = $(element)
        .find("")
        .attr("h3")
      summary = $(element)
        .find("")
        .attr("")
      urlLink = $(element)
        .find("a")
        .attr("href")

      console.log(result.headline)
      console.log(result.summary)
      console.log(result.urlLink)

      db.Article.create(result)
        .then(data => {
          console.log("yay it works!")
          res.json(data)
        })
        .catch(err => {
          res.json(err)
        })
    })
  })
})

router.get("/all", (req, res) => {
  db.Article.find()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/article/:id", (req, res) => {
  db.Article.findById(req.params.id)
    .populate("comment")
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post("/comment/:id", (req, res) => {
  db.Comment.create(req.body)
    .then(data => {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $put: { comment: data._id } },
        { new: true }
      )
    })
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router
