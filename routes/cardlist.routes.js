import { Router } from "express";
const router = Router();
import {
  categoryId,
  category,
  add_category,
  card_detail,
  add_card,
  delete_card,
  edit_card,
  find_card,
  find_card2,
  card_category,
  card_list_pagination,
  card_list_total_pages,
  card_list_home,
} from "../controllers/cardlist.controller";
import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/categoryId", categoryId);
router.get("/category", category);
router.post("/addCategory", add_category);
router.get(
  "/:type/home",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_list_home
);
router.get(
  "/:type/total_pages",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_list_total_pages
);
router.get(
  "/:type/detail/:id",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_detail
);
router.get(
  "/:type/category",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_category
)
router.post(
  "/:type/addCard",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  add_card
);
router.delete(
  "/:type/delete/:id",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  delete_card
);
router.put(
  "/:type/editcard/:id",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  edit_card
);
router.get(
  "/:type/find/:keyword/:page/:param",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  find_card2
);
router.get(
  "/:type/find/:keyword/:page",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  find_card
);
router.get(
  "/:type/:page",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_list_pagination
);

export default router;
