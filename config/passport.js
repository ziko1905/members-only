const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { user } = require("pg/lib/defaults");
const usersDb = require("../models/usersDb");

const customFields = {
  usernameField: "email",
};

const validateFunction = async (email, password, done) => {
  try {
    const user = await usersDb.getByEmail(email);

    if (!user) {
      return done(null, false, { message: "Invalid email" });
    }
    if (!bcrypt.compare(user.password, password)) {
      return done(null, false, { message: "Invalid password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, validateFunction);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersDb.getById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
