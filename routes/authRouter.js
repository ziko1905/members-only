const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const userDb = require("../models/usersDb");
const authController = require("../controllers/authController");

router.get("/signup", authController.signupGet);
router.post("signup", authController.signupPost);

module.exports = router;
