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

exports.get_all_cards = async (req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM oracle_cards_dev`);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.search = async (req, res) => {
  // ?nation=&keyword=&cardTypes=&grades=&minPower=&maxPower=&rarity=&triggers=
  console.log(req.query);
  const nation = req.query.nation;
  const keyword = req.query.keyword;
  const cardTypes = req.query.cardTypes;
  const cardTypesArr = cardTypes.split(",").map((e) => `'${e}'`);
  const grades = req.query.grades;
  const gradesArr = grades.split(",");
  const minPower = req.query.minPower;
  const maxPower = req.query.maxPower;
  const rarity = req.query.rarity;
  const triggers = req.query.triggers;
  const triggersArr = triggers.split(",").map((e) => `'${e}'`);

  const table = "oracle_cards_vairina";

  try {
    let sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                FROM    ${table} 
                WHERE   (published = 1) `;
    
    if (nation) {
      sql += `AND (nation = '${nation}') `;
    }

    if (keyword) {
      sql += `AND (name LIKE '%${keyword}%') `;
    }

    if (cardTypes) {
      sql += `AND (type IN (${cardTypesArr})) `;
    }

    if (grades) {
      sql += `AND (grade IN (${gradesArr})) `;
    }

    if (minPower) {
      sql += `AND (power >= ${minPower}) `;
    }

    if (maxPower) {
      sql += `AND (power <= ${maxPower}) `;
    }

    if (rarity) {
      sql += `AND (rarity = '${rarity}') `;
    }

    if (triggers) {
      sql += `AND ( FALSE `;
      triggersArr.forEach(val => {
        sql += `OR trigger_text LIKE '%${val}%' `;
        });
      sql += `) `;
    }

    sql += `ORDER BY SKU`;
  
    console.log(sql);

    const results = await db.promise().query(sql);
    res.json(results[0]);
    
  } catch (error) {
    console.log(error);
  }
};