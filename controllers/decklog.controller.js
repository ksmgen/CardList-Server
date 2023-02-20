const generateImage = require("../deckImage/generateImage");

const db = require("../database");
const deckTable = process.env.DECKTABLE; 
const oracleTable = process.env.ORACLECARDTABLE;

exports.decklog = async (req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM ${deckTable}`);
    res.json(results[0]);
    // console.log(JSON.parse(results[0][1].cards_sku)); jadi array
    // console.log(JSON.parse(results[0][1].cards_sku)[0]); bisa langsung diakses
  } catch (error) {
    console.log(error);
  }
};

exports.get_all_cards = async (req, res) => {
  try {
    // const table = "oracle_cards_vairina";
    const query = `SELECT SKU, image, grade, type, gift, sentinel
                  FROM ${oracleTable}
                  WHERE published = 1
                  ORDER BY SKU`;
    const results = await db.promise().query(query);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.get_cards_by_sku = async (req, res) => {
  try {
    // const table = "oracle_cards_vairina";
    const sku = req.params.sku;
    const query = `SELECT *, CONVERT (text USING utf8) as text2
                  FROM ${oracleTable}
                  WHERE REPLACE(SKU,'/','-') LIKE '%${sku}%'`;
    const results = await db.promise().query(query);

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
  const triggersArr = triggers.split(",");

  // const table = "oracle_cards_vairina";

  try {
    let sql = ` SELECT SKU, name, image, grade, type, gift, sentinel, max_qty
                FROM ${oracleTable}
                WHERE published = 1
                AND (nation = '${nation}')
              `;
  
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
        sql += `OR (trigger_text LIKE '%${val}%') `;
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


exports.add_deck = async (req, res) => {
  try {
    const deck = req.body;

    const url = generateImage(deck.hash, deck.name, JSON.parse(deck.cards), deck.nation)
    console.log(url);

    const sql = `INSERT INTO ${deckTable} (deck_hash, deck_name, cards, total_cards, nation, types_qty, grades_qty) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const results = await db
      .promise()
      .query(sql, [deck.hash, deck.name, deck.cards, deck.total_cards, deck.nation, deck.types_qty, deck.grades_qty]
    );
  
    res.json(results[0]);
    console.log(deck);
  } catch (error) {
    console.log(error);
  }
};

exports.deck_details = async (req, res) => {
  try {
    // const table = "deck_dev";
    const deck_hash = req.params.deck_hash;
    const sql = `SELECT * FROM ${deckTable} WHERE deck_hash = ?`;
    const results = await db.promise().query(sql, [deck_hash]);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
}