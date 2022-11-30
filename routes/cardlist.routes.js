const express = require("express");
const router = express.Router();
const card_controller = require("../controllers/cardlist.controller");
const bp = require('body-parser')

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))

router.get("/test", card_controller.card_test);
router.get("/categoryId", card_controller.categoryId)
router.get("/category", card_controller.category)
router.post("/addCategory",card_controller.add_category);
router.get("/:type", (req, res, next) => {
    req.type = req.params.type; next();}, card_controller.card_list)
router.get("/:type/detail/:id", (req, res, next) => {
    req.type = req.params.type; next();}, card_controller.card_detail)
router.post("/:type/addCard", (req, res, next) => {
    req.type = req.params.type; next();}, card_controller.add_card)
router.delete("/:type/delete/:id", (req, res, next) => {
    req.type = req.params.type; next();}, card_controller.delete_card)
router.put("/:type/editcard/:id", (req, res, next) => {
    req.type = req.params.type; next();}, card_controller.edit_card)

module.exports = router;
