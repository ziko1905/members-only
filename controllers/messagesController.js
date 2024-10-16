const asyncHandler = require("express-async-handler");
const messagesDb = require("../models/messagesDb");
const usersDb = require("../models/usersDb");

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

messagesDb.getMessages();

const messagesGet = asyncHandler(async (req, res, next) => {
  const messages = await messagesDb.getMessages();
  const promises = messages.map(async (msg) => {
    const user = await usersDb.getById(msg.author_id);
    return { ...msg, authorUserName: user.username };
  });

  res.locals.messages = await Promise.all(promises);
  next();
});

module.exports = { newGet, newPost, messagesGet };
