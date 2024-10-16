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
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
