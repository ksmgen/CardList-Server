const db = require("../database");

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
                      WHERE   TRUE AND (published = 1) `;
    let sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${table}
                      WHERE   TRUE AND (published = 1) `;

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

    res.json({ count: resultCount[0][0]["recNum"], cards: results[0] });
  } catch (error) {
    // IF error, we need to tell our users
    console.log(error);
    res.status(400).json({ error: "Fail to fetch cards." });
  }
};
