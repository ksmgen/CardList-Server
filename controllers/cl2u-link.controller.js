const db = require("../database");

exports.getOracle = async (req, res) => {
  try {
    const sku = decodeURIComponent(req.sku);

    const sqlFind = `  SELECT  *, CONVERT (text USING utf8) as text2
                      FROM    ${process.env.ORACLECARDTABLE}
                      WHERE   SKU = "${sku}" AND published = 1`;

    const results = await db.promise().query(sqlFind);

    const card = results[0][0];
    card.text = card.text2;
    delete card.text2;

    res.json({ result: "ok", card: card });
  } catch (error) {
    // IF error, we need to tell our users
    console.log(error);
    res.status(400).json({ result: "error", error: "Card not found." });
  }
};
