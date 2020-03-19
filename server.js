const express = require("express")
const app = express()
const mongoose = require("mongoose")
const logger = require("morgan")
const colors = require("colors")
const PORT = process.env.PORT || 5000

const connection = mongoose.connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

connection.on("error", console.error.bind(console, "connection error:"))
connection.once("open", function () {
  console.log("connected to db instance")
})

app.use(logger("dev"))

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.use(express.static("./views"))

const apiRoutes = require("./routes/api-routes")
app.use("/api", apiRoutes)

const htmlRoutes = require("./routes/html-routes")
app.use("/", htmlRoutes)

app.listen(PORT, () => {
  console.log(`listening at: http://localhost:${PORT}`.bgBlue)
})