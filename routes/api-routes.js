const express = require("express")
const router = express.Router()
const Article = require('../models/Article')

router.get("/", (req, res) => {
  res.send("<h1>Api Route</h1>")
})

router.get('/all', (res, req) => {
  Article.find().then(res => {
    res.send(res)
  }).catch(err => console.log(err))
})

router.post('/new', (req, res) => {
  console.log('server:', req.body)
  Article.create({
    title: req.body.title,
    description: req.body.description
  }).then(result => {
    console.log(result)
    res.send(result)
  }).catch(err => console.log(err));
})

module.exports = router;