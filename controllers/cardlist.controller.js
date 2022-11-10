const db = require("../database");

exports.card_list = async (req, res) => {
  const results = await db
    .promise()
    .query(
      `SELECT card.SKU AS SKU, category.name AS name, category.description AS category_description, card.image AS image, card.grade AS grade, card.nation AS nation, card.rarity AS rarity, card.race AS race, card.critical AS critical, card.illustrator AS illustrator, card.power AS power, card.regulation AS regulation, card.shield AS shield, card.skill AS skill, card.trigger_type AS trigger_type, card.type AS type, CONVERT (card.description USING utf8) AS description FROM card, category WHERE card.category_id = category.category_id`
    );
  res.json(results[0]);
};

exports.card_detail = async (req, res) => {
  const card_id = req.params.id;
  const sql =
    "SELECT card.SKU AS SKU, category.name AS name, category.description AS category_description, card.image AS image, card.grade AS grade, card.nation AS nation, card.rarity AS rarity, card.race AS race, card.critical AS critical, card.illustrator AS illustrator, card.power AS power, card.regulation AS regulation, card.shield AS shield, card.skill AS skill, card.trigger_type AS trigger_type, card.type AS type, CONVERT (card.description USING utf8) AS description FROM card, category WHERE card.category_id = category.category_id AND card.id = ?";
  const results = await db.promise().query(sql, card_id);
  res.json(results[0]);
};

exports.card_test = async (req, res) => {
  res.json({ name: "Card 1" });
};
