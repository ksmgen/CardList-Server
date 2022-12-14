import { Router } from "express";
const router = Router();
import {
  categoryId,
  category,
  add_category,
  card_list,
  card_detail,
  add_card,
  delete_card,
  edit_card,
  find_card,
  find_card2,
  card_list_pagination,
  card_list_total_pages,
  get_random_card,
  get_set_card,
  find_card_with_filter
} from "../controllers/cardlist.controller";
import { json, urlencoded } from "body-parser";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/categoryId", categoryId);
router.get("/category", category);
router.post("/addCategory", add_category);
router.get(
  "/:type",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_list
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
  "/:type/random",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  get_random_card
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
  "/:type/findset/:keyword/:page",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  get_set_card
);
/*
router.get(
  "/:type/find/:keyword/:page",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  find_card
);
*/
router.get(
  "/:type/:page",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  card_list_pagination
);

// /oracle/find/1/name,text,nation?keyword=&set=&nation=&type=
router.get(
  "/:type/find/:page/:paramChecked",
  (req, res, next) => {
    req.type = req.params.type;
    next();
  },
  find_card_with_filter
);
export default router;
