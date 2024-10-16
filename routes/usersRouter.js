const { Router } = require("express");
const usersController = require("../controllers/usersController");
const router = new Router();

router.get("/join", usersController.joinClubGet);
router.post("/join", usersController.joinClubPost);
router.get("/join-admin", usersController.becomeAdminGet);
router.post("/join-admin", usersController.becomeAdminPost);

module.exports = router;
