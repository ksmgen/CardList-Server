const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "kualalumpur-2.ceysltqt5ig6.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "OldKlangRoad#46000",
  database: "cardlist",
});
