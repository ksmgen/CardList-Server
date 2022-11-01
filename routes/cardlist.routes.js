const express = require("express");
const router = express.Router();
const card_controller = require("../controllers/cardlist.controller");

router.get("/", card_controller.card_list);
router.get("/detail/:id", card_controller.card_detail);
router.get("/test", card_controller.card_test);

module.exports = router;
