const db = require("../database");

exports.card_list = async (req, res) => {
  try {
    const type = req.type;
    const results = await db
      .promise()
      .query(
        `SELECT c.id, c.SKU AS SKU, c.name AS name, CONVERT (c.text USING utf8) AS text, c.flavor as flavor, category.name as category, category.category_description AS category_description, c.image AS image, c.grade AS grade, c.nation AS nation, c.rarity AS rarity, c.race AS race, c.critical AS critical, c.illustrator AS illustrator, c.power AS power, c.regulation AS regulation, c.shield AS shield, c.skill AS skill, c.trigger_type AS trigger_type, c.type AS type FROM ${type}_cards AS c LEFT JOIN category USING(category_id)`
      );
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_detail = async (req, res) => {
  try {
    const type = req.type;
    const card_id = req.params.id;
    const sql =
      `SELECT c.id, c.SKU AS SKU, c.name AS name, CONVERT (c.text USING utf8) AS text, c.flavor as flavor, category.name AS category, category.category_description AS category_description, c.image AS image, c.grade AS grade, c.nation AS nation, c.rarity AS rarity, c.race AS race, c.critical AS critical, c.illustrator AS illustrator, c.power AS power, c.regulation AS regulation, c.shield AS shield, c.skill AS skill, c.trigger_type AS trigger_type, c.type AS type FROM ${type}_cards AS c LEFT JOIN category USING(category_id) WHERE c.id = ?`;
    const results = await db.promise().query(sql, card_id);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.add_card = async (req, res) => {
  try {
    const type = req.type;
    const card = req.body;
    const sql =
      `INSERT INTO ${type}_cards (SKU, name, text, flavor, category_id, image, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_type, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const results = await db
      .promise()
      .query(sql, [
        card.SKU,
        card.name,
        card.text,
        card.flavor,
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
  } catch (error) {
    console.log(error);
  }
};

exports.delete_card = async (req, res) => {
  try {
    const type = req.type;
    const card_id = req.params.id;
    const sql = `DELETE FROM ${type}_cards WHERE id = ?`;
    const results = await db.promise().query(sql, card_id);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.edit_card = async (req, res) => {
  try {
    const type = req.type;
    const card = req.body;
    const card_id = req.params.id;
    console.log(card_id)
    const sql =
      `UPDATE ${type}_cards SET SKU = ?, name = ?, text = ?, flavor = ?, category_id = ?, image = ?, grade = ?, nation = ?, rarity = ?, race = ?, critical = ?, illustrator = ?, power = ?, regulation = ?, shield = ?, skill = ?, trigger_type = ?, type = ? WHERE id = ?`;
    const results = await db
      .promise()
      .query(sql, [
        card.SKU,
        card.name,
        card.text,
        card.flavor,
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
        card_id]);

    res.json(results[0]);
    console.log(card);
  } catch (error) {
    console.log(error);
  }
}

exports.categoryId = async (req, res) => {
  try {
    const results = await db
      .promise()
      .query(
        `SELECT category_id FROM category`
      );
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.category = async (req, res) => {
  try {
    const results = await db
      .promise()
      .query(
        `SELECT * FROM category`
      );
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.add_category = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
