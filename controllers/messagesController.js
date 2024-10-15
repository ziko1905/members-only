function newGet(req, res) {
  res.render("newMsg", { title: "Create new message" });
}

module.exports = { newGet };
