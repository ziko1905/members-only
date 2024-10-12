const { Router } = require("express");
const router = new Router();
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const userDb = require("../models/userDb.js");

const validateFunction = async (username, password, done) => {
  try {
  } catch (err) {}
};

const strategy = new LocalStrategy();

router.use();
