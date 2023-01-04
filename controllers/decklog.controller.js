const db = require("../database");

exports.decklog = async (req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM deck_dev`);
    res.json(results[0]);
    // console.log(JSON.parse(results[0][1].cards_sku)); jadi array
    // console.log(JSON.parse(results[0][1].cards_sku)[0]); bisa langsung diakses
  } catch (error) {
    console.log(error);
  }
};
