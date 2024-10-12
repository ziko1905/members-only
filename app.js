const express = require("express")
const app = express()

app.use("views", __dirname + "/views")
app.use("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listening on port: ${PORT}`))