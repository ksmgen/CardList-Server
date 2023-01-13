import { Router } from "express";
const router = Router();

import {
decklog,
get_all_cards,
search,
} from "../controllers/decklog.controller";

import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/", decklog);
router.get("/get_all_cards", get_all_cards);
router.get("/search", search);

export default router;
