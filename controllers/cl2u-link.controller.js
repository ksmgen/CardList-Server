const db = require("../database");

const atob = (base64) => {
  return Buffer.from(base64, 'base64').toString('binary').replace(/[^\x00-\x7F]/g, "");
};

exports.getOracle = async (req, res) => {
  try {
    // const sku = decodeURIComponent(req.sku);
    // const sku = atob(req.sku);
    // console.log("new")

    const sqlFind = ` SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${process.env.ORACLECARDTABLE}
                      WHERE   SKU LIKE '%${req.d}/${req.no}%' AND published = 1`;

    // console.log(sqlFind);

    const results = await db.promise().query(sqlFind);

    const card = results[0][0];
    card.text = card.text2;
    delete card.text2;

    // console.log(card)

    res.json({ result: "ok", card: card });
  } catch (error) {
    // IF error, we need to tell our users
    // console.log(error);
    res.status(400).json({ result: "error", error: "Card not found." });
  }
};
