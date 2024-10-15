const { Router } = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();

router.get("/join", usersController.joinClubGet);
router.post("/join", usersController.joinClubPost);

module.exports = router;
