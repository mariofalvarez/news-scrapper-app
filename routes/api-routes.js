const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
const cheerio = require("cheerio")

router.get("/api", (req, res) => {
  axios
    .get("https://www.nytimes.com/section/technology")
    .then(urlResponse => {
      let $ = cheerio.load(urlResponse.data)

      const collection = []

      $("div.css-1l4spti").each((i, element) => {
        const result = {}

        result.headline = $(element)
          .find("h2.e1xfvim30")
          .text()
        result.summary = $(element)
          .find("p.e1xfvim31")
          .text()
        result.url =
          "https://www.nytimes.com" +
          $(element)
          .find("a")
          .attr("href")

        collection.push(result)
      })

      db.Article.insertMany(collection)
        .then(data => {
          res.json(data)
        })
        .catch(err => {
          res.json(err)
        })
      console.log(collection)
    })
    .catch(err => {
      res.json(err)
    })
})

// router.get("/all", (req, res) => {
//   db.Article.find()
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

// router.get("/article/:id", (req, res) => {
//   db.Article.findById(req.params.id)
//     .populate("comment")
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

router.post("/comment/:id", (req, res) => {
  console.log("params.id", req.params.id)
  console.log("req.body", req.body.comment)

  db.Article.findByIdAndUpdate({
    _id: req.params.id
  }, {
    $push: {
      comment: req.body.comment
    }
  }).then()
})

module.exports = router