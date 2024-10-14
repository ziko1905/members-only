const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const connect = require("connect-pg-simple")(session);
require("dotenv").config();
require("./config/passport");

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const messagesRouter = require("./routes/messagesRouter");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: new connect(),
  })
);
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(messagesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on port: ${PORT}`));
