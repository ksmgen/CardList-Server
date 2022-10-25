const db = require("../database");

exports.cardlist = async (req, res) => {
  const results = await db
    .promise()
    .query(
      `SELECT card.SKU AS SKU, category.name AS name, category.category_desc AS category_desc, card.image AS image, card.grade AS grade, card.nation AS nation, card.rarity AS rarity, card.race AS race, card.critical AS critical, card.illustrator AS illustrator, card.power AS power, card.regulation AS regulation, card.shield AS shield, card.skill AS skill, card.trigger_type AS trigger_type, card.type AS type, CONVERT (description USING utf8) AS description FROM card, category WHERE card.category_id = category.category_id`
    );
  res.json(results[0]);
};
