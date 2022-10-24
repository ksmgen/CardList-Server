const db = require("../database");

exports.cardlist = async (req, res) => {
  const results = await db
    .promise()
    .query(
      `SELECT * FROM card, category WHERE card.category_id = category.category_id`
    );
  res.json(results[0]);
};
