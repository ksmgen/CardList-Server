const db = require("../database");

exports.card_list = async (req, res) => {
  const results = await db
    .promise()
    .query(
      `SELECT card.SKU AS SKU, category.name AS name, category.category_description AS category_description, card.image AS image, card.grade AS grade, card.nation AS nation, card.rarity AS rarity, card.race AS race, card.critical AS critical, card.illustrator AS illustrator, card.power AS power, card.regulation AS regulation, card.shield AS shield, card.skill AS skill, card.trigger_type AS trigger_type, card.type AS type, CONVERT (card.description USING utf8) AS description FROM card LEFT JOIN category USING(category_id)`
    );
  res.json(results[0]);
};

exports.card_detail = async (req, res) => {
  const card_id = req.params.id;
  const sql =
    "SELECT card.SKU AS SKU, category.name AS name, category.category_description AS category_description, card.image AS image, card.grade AS grade, card.nation AS nation, card.rarity AS rarity, card.race AS race, card.critical AS critical, card.illustrator AS illustrator, card.power AS power, card.regulation AS regulation, card.shield AS shield, card.skill AS skill, card.trigger_type AS trigger_type, card.type AS type, CONVERT (card.description USING utf8) AS description FROM card, category WHERE card.category_id = category.category_id AND card.id = ?";
  const results = await db.promise().query(sql, card_id);
  res.json(results[0]);
};

exports.add_card = async (req, res) => {
  const card = req.body;
  const sql =
    "INSERT INTO card (SKU, name, description, category_id, image, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_type, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const results = await db
    .promise()
    .query(sql, [
      card.SKU,
      card.name,
      card.description,
      parseInt(card.categoryId),
      card.image,
      parseInt(card.grade),
      card.nation,
      card.rarity,
      card.race,
      parseInt(card.critical),
      card.illustrator,
      parseInt(card.power),
      card.regulation,
      parseInt(card.shield),
      card.skill,
      card.triggerType,
      card.type,
    ]);
  
  res.json(results[0]);
  console.log(card);
};

exports.add_category = async (req, res) => {
  const category = req.body;
  const sql =
    "INSERT INTO category (name, category_description) VALUES (?, ?)";
  const results = await db
    .promise()
    .query(sql, [
      category.name,
      category.description,
    ]);

  res.json(results[0]);
  console.log(category);
};



exports.card_test = async (req, res) => {
  res.json({ name: "Card 1" });
};
