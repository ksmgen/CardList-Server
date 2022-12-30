import { Router } from "express";
const router = Router();

import { decklog } from "../controllers/decklog.controller";
import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/", decklog);

export default router;
