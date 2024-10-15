const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const messagesController = require("../controllers/messagesController");

router.get("/new-message", authController.isMember, messagesController.newGet);

module.exports = router;
