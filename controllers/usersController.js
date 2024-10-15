function joinClubGet(req, res) {
  if (!req.user) {
    return res.redirect("/signup");
  }
  res.render("join", { title: "Join Club", header: "Its not that easy!" });
}

module.exports = {
  joinClubGet,
};
