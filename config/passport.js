const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { user } = require("pg/lib/defaults");
const usersDb = require("../models/usersDb");

const validateFunction = async (username, password, done) => {
  try {
    const user = await usersDb.getByUsername(username);

    if (!user) {
      done(null, false, { message: "Invalid username" });
    }
    if (!bcrypt.compare(user.password, password)) {
      done(null, false, { message: "Invalid password" });
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(validateFunction);

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
