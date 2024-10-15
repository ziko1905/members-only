const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const userDb = require("../models/usersDb");
const authController = require("../controllers/authController");
const passport = require("passport");

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);
router.get("/login", authController.loginGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

module.exports = router;
