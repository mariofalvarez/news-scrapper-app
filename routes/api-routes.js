const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
const cheerio = require("cheerio")

router.get("/scrapped", (req, res) => {
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
          console.log("yay it works!")
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

// router.post("/comment/:id", (req, res) => {
//   db.Comment.create(req.body)
//     .then(data => {
//       return db.Article.findOneAndUpdate(
//         { _id: req.params.id },
//         { $put: { comment: data._id } },
//         { new: true }
//       )
//     })
//     .then(data => {
//       res.json(data)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

module.exports = router
