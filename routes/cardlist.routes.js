const express = require("express");
const router = express.Router();
const card_controller = require("../controllers/cardlist.controller");

router.get("/", card_controller.cardlist);

module.exports = router;
