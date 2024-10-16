const asyncHandler = require("express-async-handler");
const usersDb = require("../models/usersDb");
require("dotenv").config();

function joinClubGet(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.render("join", { title: "Join Club", header: "Its not that easy!" });
}

// Not validating passcode bcs of flexibility
const joinClubPost = asyncHandler(async (req, res) => {
  const match = req.body.passcode == process.env.PASSCODE;
  if (!match) {
    return res.render("join", {
      title: "Join Club",
      header: "Its really not that easy!",
      errorMsg: "Wrong passcode!",
    });
  }
  await usersDb.makeMember(req.user.id);
  res.redirect("/");
});

function becomeAdminGet(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  res.render("join", {
    title: "Admin login",
    header: "Don't bother if you are not staff!",
  });
}

const becomeAdminPost = asyncHandler(async (req, res) => {
  const match = req.body.passcode == process.env.ADMIN_PASSCODE;
  if (!match) {
    return res.render("join", {
      title: "Admin login",
      header: "You really should't be doing this if you are not staff!",
      errorMsg: "Wrong passcode!",
    });
  }
  await usersDb.makeAdmin(req.user.id);
  res.redirect("/");
});

module.exports = {
  joinClubGet,
  joinClubPost,
  becomeAdminGet,
  becomeAdminPost,
};
