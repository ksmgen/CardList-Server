import { Router } from "express";
const router = Router();

import {
decklog,
get_all_cards,
search,
add_deck,
deck_details,
} from "../controllers/decklog.controller";

import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/", decklog);
router.get("/get_all_cards", get_all_cards);
router.get("/search", search);
router.post("/add_deck", add_deck);
router.get("deck/:deck_hash", deck_details);

export default router;
