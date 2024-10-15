const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const messagesController = require("../controllers/messagesController");

router.get(
  "/new-message",
  authController.isAuthenticated,
  messagesController.newGet
);
router.post(
  "/new-message",
  authController.isAuthenticated,
  messagesController.newPost
);

module.exports = router;
