const db = require("../database");

exports.card_list_home = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const results = await db
      .promise()
      .query(
        `SELECT  *, CONVERT (text USING utf8) as text2 FROM ${table} ORDER BY last_update LIMIT 9`
      );
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_list_pagination = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const page = req.params.page;
    const offset = 50 * page - 50;
    const sqlCount = `  SELECT  COUNT(*) as recNum
                        FROM    ${table}`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${table} 
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const results = await db.promise().query(
      ` SELECT  COUNT(*) as recNum
          FROM    ${table}`
    );
    res.json(Math.ceil(results[0][0]["recNum"] / 50));
  } catch (error) {
    res.json(0);
  }
};

exports.card_detail = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const card_id = req.params.id;
    const sql = `SELECT id, SKU, name, CONVERT (text USING utf8) AS text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, gift, sentinel, type, finishing FROM ${table} WHERE id = ?`;
    const results = await db.promise().query(sql, card_id);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_detail2 = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const card_sku = req.params.sku;
    const sql = `SELECT id, SKU, name, CONVERT (text USING utf8) AS text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, gift, sentinel, type, finishing FROM ${table} WHERE REPLACE(SKU,'/','-') LIKE '%${card_sku}%'`;
    const results = await db.promise().query(sql);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.card_category = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const sql = `SELECT DISTINCT category FROM ${table}`;
    const results = await db.promise().query(sql);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.add_card = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const card = req.body;
    const sql = `INSERT INTO ${table} (SKU, name, text, flavor, category, image, image2, grade, nation, rarity, race, critical, illustrator, power, regulation, shield, skill, trigger_text, gift, sentinel, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
        card.gift,
        card.sentinel,
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const card_id = req.params.id;
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const results = await db.promise().query(sql, card_id);
    res.json(results[0]);
  } catch (error) {
    console.log(error);
  }
};

exports.edit_card = async (req, res) => {
  try {
    const type = req.type;
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const card = req.body;
    const card_id = req.params.id;
    console.log(card_id);
    const sql = `UPDATE ${table} SET SKU = ?, name = ?, text = ?, flavor = ?, category = ?, image = ?, image2 = ?, grade = ?, nation = ?, rarity = ?, race = ?, critical = ?, illustrator = ?, power = ?, regulation = ?, shield = ?, skill = ?, trigger_text = ?, gift = ? , sentinel = ?, , type = ? WHERE id = ?`;
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
        card.gift,
        card.sentinel,
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const page = req.params.page;
    const offset = page * 50 - 50;

    const sqlCount = `  SELECT  COUNT(*) as recNum
                        FROM    ${table}
                        WHERE   LOWER(SKU) LIKE '%${keyword}%' 
                                  OR LOWER(name) LIKE '%${keyword}%' 
                                  OR LOWER(CONVERT (text USING utf8)) LIKE '%${keyword}%' 
                                  OR LOWER(flavor) LIKE '%${keyword}%' 
                                  OR LOWER(nation) LIKE '%${keyword}%' 
                                  OR LOWER(race) LIKE '%${keyword}%' 
                                  OR LOWER(illustrator) LIKE '%${keyword}%'`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${table}
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const param = req.params.param;
    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${table}
                      WHERE   FALSE `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${table}
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${table}
                  WHERE (published = 1)
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const keyword = decodeURI(req.params.keyword).toLowerCase();
    const page = req.params.page;
    const offset = page * 50 - 50;
    const sqlc = ` SELECT  COUNT(*) as recNum
                  FROM    ${table} 
                  WHERE   LOWER(category) LIKE '%${keyword}%'`;
    const sql = ` SELECT  *, CONVERT (text USING utf8) as text2
                  FROM    ${table}
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
    const table = type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const keyword = req.query.keyword;
    const paramChecked = req.params.paramChecked;
    const nation = req.query.nation;
    const orderBy = req.query.orderBy;
    const set = req.query.set;
    const grade = req.query.grade;
    const givenFinishing = req.query.finishing;
    const givenFinishingArr = givenFinishing.split(",");
    const card_type = req.query.type;
    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${table} 
                      WHERE   (published = 1) `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${table}
                      WHERE   (published = 1) `;

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

exports.find_advance = async (req, res) => {
  // http://localhost:3001/cardlist/oracle/find_advance/1/?name=&text=&power=&shield=&race=&flavor=&illustrator=&set=&grade=&rarity=&unitType=&gift=&finishing=&orderBy=
  try {
    console.log(req.query);
    const table = req.type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const name = req.query.name;
    const nameArr = name.split(",");
    const text = req.query.text;
    const textArr = text.split(",");
    const power = req.query.power;
    const shield = req.query.shield;
    const race = req.query.race;
    const raceArr = race.split(",");
    const nation = req.query.nation;
    const nationArr = nation.split(",");
    const flavor = req.query.flavor;
    const flavorArr = flavor.split(",");
    const illustrator = req.query.illustrator;
    const illustratorArr = illustrator.split(",");
    const set = req.query.set;
    const setArr = set.split(",");
    const grade = req.query.grade;
    const rarity = req.query.rarity;
    const rarityArr = rarity.split(",").map((e) => `'${e}'`);
    const unitType = req.query.unitType;
    const unitTypeArr = unitType.split(",").map((e) => `'${e}'`);
    const gift = req.query.gift;
    const giftArr = gift.split(",");
    const finishing = req.query.finishing;
    const finishingArr = finishing.split(",");
    const orderBy = req.query.orderBy;

    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${table} 
                      WHERE   (published = 1) `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${table}
                      WHERE   (published = 1) `;

    if (name) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      nameArr.forEach((val) => {
        sqlCount += `OR LOWER(name) LIKE '%${val}%' `;
        sqlFind += `OR LOWER(name) LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (text) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      textArr.forEach((val) => {
        sqlCount += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${val}%' `;
        sqlFind += `OR LOWER(CONVERT (text USING utf8)) LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (power) {
      sqlCount += `AND (power in (${power}))`;
      sqlFind += `AND (power in (${power}))`;
    }

    if (shield) {
      sqlCount += `AND (shield in (${shield}))`;
      sqlFind += `AND (shield in (${shield}))`;
    }

    if (race) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      raceArr.forEach((val) => {
        sqlCount += `OR LOWER(race) LIKE '%${val}%' `;
        sqlFind += `OR LOWER(race) LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (nation) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      nationArr.forEach(val => {
        sqlCount += `OR LOWER(nation) LIKE '%${val}%' `;
        sqlFind += `OR LOWER(nation) LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (flavor) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      flavorArr.forEach((val) => {
        sqlCount += `OR LOWER(flavor) LIKE '%${val}%' `;
        sqlFind += `OR LOWER(flavor) LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (illustrator) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      illustratorArr.forEach((val) => {
        sqlCount += `OR illustrator LIKE '%${val}%' `;
        sqlFind += `OR illustrator LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (set) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      setArr.forEach((val) => {
        sqlCount += `OR category LIKE '%${val}%' `;
        sqlFind += `OR category LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (grade) {
      sqlCount += `AND (grade in (${grade}))`;
      sqlFind += `AND (grade in (${grade}))`;
    }

    if (rarity) {
      sqlCount += `AND (rarity in (${rarityArr}))`;
      sqlFind += `AND (rarity in (${rarityArr}))`;
    }

    if (unitType) {
      sqlCount += `AND (type in (${unitTypeArr}))`;
      sqlFind += `AND (type in (${unitTypeArr}))`;
    }

    if (gift) {
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      giftArr.forEach((val) => {
        sqlCount += `OR gift LIKE '%${val}%' `;
        sqlFind += `OR gift LIKE '%${val}%' `;
      });
      sqlCount += `) `;
      sqlFind += `) `;
    }

    if (finishing) {
      // Loop through the finishingArr and add the sql
      sqlCount += `AND ( FALSE `;
      sqlFind += `AND ( FALSE `;
      for (let i = 0; i < finishingArr.length; i++) {
        currentFinishing = finishingArr[i];
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

exports.find_quick = async (req, res) => {
  // search from navbar
  try {
    console.log(req.query);
    const table = req.type.includes("oracle")
      ? process.env.ORACLECARDTABLE
      : process.env.PRINTEDCARDTABLE;
    const keyword = req.query.keyword;
    const page = req.params.page;
    const offset = page * 50 - 50;

    let sqlCount = `  SELECT  COUNT(*) as recNum
                      FROM    ${table} 
                      WHERE   (published = 1) `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${table}
                      WHERE   (published = 1) `;

    if (keyword) {
      sqlCount += `AND ( name LIKE '%${keyword}%')`;
      sqlFind += `AND ( name LIKE '%${keyword}%')`;
    }

    sqlFind += `ORDER BY id LIMIT 50 OFFSET ${offset}`;

    const resultCount = await db.promise().query(sqlCount);
    const results = await db.promise().query(sqlFind);

    console.log(sqlFind);

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
  } catch (error) {
    console.log(error);
  }
};
