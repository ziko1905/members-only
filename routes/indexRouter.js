const { Router } = require("express")
const router = new Router()

router.get("/", (req, res) => {
    res.send("Homepage")
})

module.exports = router