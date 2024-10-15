const asyncHandler = require("express-async-handler");
const messagesDb = require("../models/messagesDb");

function newGet(req, res) {
  res.render("newMsg", { title: "Create new message" });
}

const newPost = asyncHandler(async (req, res) => {
  await messagesDb.newMessage(
    req.body.title,
    req.body.content,
    new Date().toISOString(),
    req.user.id
  );
  res.redirect("/");
});

module.exports = { newGet, newPost };
