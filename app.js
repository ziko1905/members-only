const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const routes = require("./routes");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on port: ${PORT}`));
