import { Router } from "express";
const router = Router();
import { categoryId, category, add_category, card_list, card_detail, add_card, delete_card, edit_card } from "../controllers/cardlist.controller";
import { json, urlencoded } from 'body-parser';

router.use(json())
router.use(urlencoded({ extended: true }))

router.get("/categoryId", categoryId)
router.get("/category", category)
router.post("/addCategory",add_category);
router.get("/:type", (req, res, next) => {
    req.type = req.params.type; next();}, card_list)
router.get("/:type/detail/:id", (req, res, next) => {
    req.type = req.params.type; next();}, card_detail)
router.post("/:type/addCard", (req, res, next) => {
    req.type = req.params.type; next();}, add_card)
router.delete("/:type/delete/:id", (req, res, next) => {
    req.type = req.params.type; next();}, delete_card)
router.put("/:type/editcard/:id", (req, res, next) => {
    req.type = req.params.type; next();}, edit_card)

export default router;
