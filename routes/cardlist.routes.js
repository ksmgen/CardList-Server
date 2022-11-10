const express = require("express");
const router = express.Router();
const card_controller = require("../controllers/cardlist.controller");
const bp = require('body-parser')

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))

router.get("/", card_controller.card_list);
router.get("/detail/:id", card_controller.card_detail);
router.post("/addCard", card_controller.add_card);
router.get("/test", card_controller.card_test);

module.exports = router;
