const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const usersDb = require("../models/usersDb");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("dotenv").config();
const SALT = process.env.SALT || 10; //Could be increased for better security

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name not specified")
    .isAlpha()
    .withMessage("Invalid first name"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name not specified")
    .isAlpha()
    .withMessage("Invalid last name"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be in form of 'example@example.com'")
    .custom(async (value) => {
      const user = await usersDb.getByEmail(value);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("password").notEmpty().withMessage("Password not included"),
  body("passwordConfirm").custom((value, { req }) => {
    if (value != req.body.password)
      throw new Error("Password and confirm do not match");
    return true;
  }),
  body("member")
    .optional()
    .custom((value, { req }) => {
      if (!["true", "false"].includes(value)) {
        throw new Error("Error, users title is invalid (member field)");
      }
      req.body.member = value = "true" ? true : false;
      return true;
    }),
  body("admin")
    .optional()
    .custom((value, { req }) => {
      if (!["true", "false"].includes(value)) {
        throw new Error("Error, users title is invalid (admin field)");
      }
      req.body.admin = value = "true" ? true : false;
      return true;
    }),
];

const signupGet = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};

const signupPost = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsgs = errors.array().map((err) => err.msg);
      return res.render("signup", {
        title: "Sign Up",
        errorMsgs: errMsgs,
      });
    }
    const info = [
      getFull(req.body.firstName, req.body.lastName),
      req.body.email,
      bcrypt.hashSync(req.body.password, SALT),
      getUsername(req.body.email),
      req.body.member ? true : false,
      req.body.admin ? true : false,
    ];
    await usersDb.addUser(...info);
    next();
  }),
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/",
  }),
];

function loginGet(req, res) {
  if (req.user) {
    return res.render("login", { title: "Log In", logged: true });
  }

  if (req.session.messages) {
    return res.render("login", {
      title: "Log In",
      message: req.session.messages[req.session.messages.length - 1],
    });
  }
  res.render("login", {
    title: "Log In",
  });
}

const isAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  next();
};

const isMember = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const member = await usersDb.isMember(req.user.id);
  if (!member) {
    return res.redirect("/join");
  }
  next();
};

function getFull() {
  if (arguments.length < 2) throw new Error("Need at least 2 args");
  const full = [...arguments].join(" ");
  return [...arguments].join(" ");
}

function getUsername(email) {
  const prefixArr = email.slice(0, email.indexOf("@")).split(".");
  return prefixArr.join(" ");
}

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  isAuthenticated,
  isMember,
};
