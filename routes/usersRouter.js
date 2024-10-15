const { Router } = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();

router.get("/join", usersController.joinClubGet);

module.exports = router;
