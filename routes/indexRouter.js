const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Homepage", user: req.user });
});

module.exports = router;
