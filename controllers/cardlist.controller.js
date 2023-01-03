const db = require("../database");

exports.card_list_home = async (req, res) => {
  try {
    const type = req.type;
    // example for @claudia
    const table = type.includes("oracle") ? process.env.ORACLECARDTABLE : process.env.PRINTEDCARDTABLE
    const results = await db
      .promise()
      .query(
        `SELECT id, SKU, name, CONVERT (text USING utf8) AS text, flavor, category, image, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, type FROM ${type}_cards_dev ORDER BY last_update LIMIT 9`
      );
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_list_pagination = async (req, res) => {
  try {
    const type = req.type;
    const page = req.params.page;
    const offset = 50 * page - 50;
    const sqlCount = `  SELECT  COUNT(*) as recNum
                        FROM    ${type}_cards_dev`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${type}_cards_dev 
                  ORDER BY id
                  LIMIT 50 OFFSET ${offset}`;

    const resultCount = await db.promise().query(sqlCount);
    const results = await db.promise().query(sql);

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
    //res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_list_total_pages = async (req, res) => {
  try {
    const type = req.type;
    const results = await db.promise().query(
      ` SELECT  COUNT(*) as recNum
          FROM    ${type}_cards_dev`
    );
    res.json(Math.ceil(results[0][0]["recNum"] / 50));
  } catch (error) {
    res.json(0);
  }
};

exports.card_detail = async (req, res) => {
  try {
    const type = req.type;
    const card_id = req.params.id;
    const sql = `SELECT id, SKU, name, CONVERT (text USING utf8) AS text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, type, finishing FROM ${type}_cards_dev WHERE id = ?`;
    const results = await db.promise().query(sql, card_id);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_detail2 = async (req, res) => {
  try {
    const type = req.type;
    const card_sku = req.params.sku;
    const sql = `SELECT id, SKU, name, CONVERT (text USING utf8) AS text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, type, finishing FROM ${type}_cards_dev WHERE REPLACE(SKU,'/','-') LIKE '%${card_sku}%'`;
    const results = await db.promise().query(sql);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_category = async (req, res) => {
  try {
    const type = req.type;
    const sql = `SELECT DISTINCT category FROM ${type}_cards_dev`;
    const results = await db.promise().query(sql);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.add_card = async (req, res) => {
  try {
    const type = req.type;
    const card = req.body;
    const sql = `INSERT INTO ${type}_cards_dev (SKU, name, text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const results = await db
      .promise()
      .query(sql, [
        card.SKU,
        card.name,
        card.text,
        card.flavor,
        card.category,
        card.image,
        card.image2,
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
    const sql = `DELETE FROM ${type}_cards_dev WHERE id = ?`;
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
    console.log(card_id);
    const sql = `UPDATE ${type}_cards_dev SET SKU = ?, name = ?, text = ?, flavor = ?, category = ?, image = ?, image2 = ?, grade = ?, nation = ?, rarity = ?, race = ?, critical = ?, illustrator = ?, power = ?, regulation = ?, shield = ?, skill = ?, trigger_text = ?, type = ? WHERE id = ?`;
    const results = await db
      .promise()
      .query(sql, [
        card.SKU,
        card.name,
        card.text,
        card.flavor,
        card.category,
        card.image,
        card.image2,
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
        card_id,
      ]);

    res.json(results[0]);
    console.log(card);
  } catch (error) {
    console.log(error);
  }
};

exports.categoryId = async (req, res) => {
  try {
    const results = await db
      .promise()
      .query(`SELECT category_id FROM category`);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.category = async (req, res) => {
  try {
    const results = await db.promise().query(`SELECT * FROM category`);
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
      .query(sql, [category.name, category.description]);

    res.json(results[0]);
    console.log(category);
  } catch (error) {
    console.log(error);
  }
};

exports.find_card = async (req, res) => {
  try {
    const type = req.type;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const page = req.params.page;
    const offset = page * 50 - 50;

    const sqlCount = `  SELECT  COUNT(*) as recNum
                        FROM    ${type}_cards_dev 
                        WHERE   LOWER(SKU) LIKE '%${keyword}%' 
                                  OR LOWER(name) LIKE '%${keyword}%' 
                                  OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' 
                                  OR LOWER(flavor) LIKE '%${keyword}%' 
                                  OR LOWER(nation) LIKE '%${keyword}%' 
                                  OR LOWER(race) LIKE '%${keyword}%' 
                                  OR LOWER(illustrator) LIKE '%${keyword}%'`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${type}_cards_dev 
                  WHERE   LOWER(SKU) LIKE '%${keyword}%' 
                            OR LOWER(name) LIKE '%${keyword}%' 
                            OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' 
                            OR LOWER(flavor) LIKE '%${keyword}%' 
                            OR LOWER(nation) LIKE '%${keyword}%' 
                            OR LOWER(race) LIKE '%${keyword}%' 
                            OR LOWER(illustrator) LIKE '%${keyword}%' 
                  ORDER BY id
                  LIMIT 50 OFFSET ${offset}`;

    const resultCount = await db.promise().query(sqlCount);
    const results = await db.promise().query(sql);

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.find_card2 = async (req, res) => {
  try {
    const type = req.type;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const param = req.params.param;
    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${type}_cards_dev 
                      WHERE   FALSE `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${type}_cards_dev 
                      WHERE   FALSE `;

    if (param.includes("name")) {
      sqlCount += `OR LOWER(name) LIKE '%${keyword}%'`;
      sqlFind += `OR LOWER(name) LIKE '%${keyword}%'`;
    }

    if (param.includes("text")) {
      sqlCount += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' `;
      sqlFind += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' `;
    }

    if (param.includes("nation")) {
      sqlCount += `OR LOWER(nation) LIKE '%${keyword}%' `;
      sqlFind += `OR LOWER(nation) LIKE '%${keyword}%' `;
    }

    sqlFind += `ORDER BY id LIMIT 50 OFFSET ${offset}`;

    const resultCount = await db.promise().query(sqlCount);
    const results = await db.promise().query(sqlFind);

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.get_random_card = async (req, res) => {
  try {
    const type = req.type;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${type}_cards_dev 
                  ORDER BY RAND ( )  
                  LIMIT 1`;

    const result = await db.promise().query(sql);

    res.json({ count: 1, card: result[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.get_set_card = async (req, res) => {
  try {
    const type = req.type;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const page = req.params.page;
    const offset = page * 50 - 50;
    const sqlc = ` SELECT  COUNT(*) as recNum
                  FROM    ${type}_cards_dev 
                  WHERE   LOWER(category) LIKE '%${keyword}%'`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${type}_cards_dev 
                  WHERE   LOWER(category) LIKE '%${keyword}%'
                  ORDER BY id
                  LIMIT 50 OFFSET ${offset}`;

    const resultc = await db.promise().query(sqlc);
    const result = await db.promise().query(sql);

    res.json({ count: resultc[0][0]["recNum"], cards: result[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.find_card_with_filter = async (req, res) => {
  try {
    console.log(req.query);
    const type = req.type;
    const keyword = req.query.keyword;
    const paramChecked = req.params.paramChecked;
    const nation = req.query.nation;
    const orderBy = req.query.orderBy;
    const set = req.query.set;
    const grade = req.query.givenGradeList;
    const givenFinishing = req.query.givenFinishingList;
    const givenFinishingArr = givenFinishing.split(",");
    const card_type = req.query.type;
    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${type}_cards_dev 
                      WHERE   TRUE `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${type}_cards_dev 
                      WHERE   TRUE `;

    if (nation) {
      sqlCount += `AND nation = '${nation}' `;
      sqlFind += `AND nation = '${nation}' `;
    }

    if (set) {
      sqlCount += `AND category LIKE '%${set}%' `;
      sqlFind += `AND category LIKE '%${set}%' `;
    }

    if (card_type) {
      sqlCount += `AND type = '${card_type}' `;
      sqlFind += `AND type = '${card_type}' `;
    }

    if (grade) {
      sqlCount += `AND grade in (${grade})`;
      sqlFind += `AND grade in (${grade})`;
    }

    if (givenFinishing) {
      // Loop through the givenFinishingArr and add the sql
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      for (let i = 0; i < givenFinishingArr.length; i++) {
        currentFinishing = givenFinishingArr[i];
        if (currentFinishing == "Stamped") {
          // based on current database, cards with "Stamped" finishing do not have "Foil + Stamped" finishing
          // but cards with "Foil" finishing do have "Foil + Stamped" finishing too
          sqlCount += `OR finishing LIKE '%${currentFinishing}%' AND finishing NOT LIKE '%Foil + Stamped%' `;
          sqlFind += `OR finishing LIKE '%${currentFinishing}%' AND finishing NOT LIKE '%Foil + Stamped%' `;
        } else {
          sqlCount += `OR finishing LIKE '%${currentFinishing}%' `;
          sqlFind += `OR finishing LIKE '%${currentFinishing}%' `;
        }
      }

      sqlCount += `) `;
      sqlFind += `) `;
    }

    sqlCount += `AND ( FALSE `;
    sqlFind += `AND ( FALSE `;

    if (paramChecked.includes("name")) {
      sqlCount += `OR LOWER(name) LIKE '%${keyword}%' `;
      sqlFind += `OR LOWER(name) LIKE '%${keyword}%' `;
    }

    if (paramChecked.includes("text")) {
      sqlCount += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' `;
      sqlFind += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' `;
    }

    if (paramChecked.includes("nation")) {
      sqlCount += `OR LOWER(nation) LIKE '%${keyword}%' `;
      sqlFind += `OR LOWER(nation) LIKE '%${keyword}%' `;
    }

    sqlCount += `) `;
    sqlFind += `) `;

    if (orderBy) {
      sqlFind += `ORDER BY ${orderBy.toLowerCase()} LIMIT 50 OFFSET ${offset}`;
    } else {
      sqlFind += `ORDER BY id LIMIT 50 OFFSET ${offset}`;
    }

    const resultCount = await db.promise().query(sqlCount);
    const results = await db.promise().query(sqlFind);

    console.log(sqlFind);

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
  } catch (error) {
    console.log(error);
  }
};
