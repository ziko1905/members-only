const { Router } = require("express");
const router = new Router();
const messagesController = require("../controllers/messagesController");

router.get("/", messagesController.messagesGet, (req, res) => {
  res.render("index", { title: "Homepage" });
});

module.exports = router;
