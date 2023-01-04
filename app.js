import express from "express";
import cors from "cors";

import cardRouter from "./routes/cardlist.routes";
import deckRouter from "./routes/decklog.routes";

const app = express();
const port = process.env.PORT || 3001;
const db = require("./database");

// cors
app.use(cors());
app.listen(port, () =>
  console.log(`VGB CardList Server is listening on port ${port}!`)
);

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");
});

var interval = setInterval(async () => {
  const testCon = await db.promise().query("SELECT 1");
  //console.log(testCon[0]);
}, 60000);

/**
 * routes
 */
app.use("/cardlist", cardRouter);
app.use("/decklog", deckRouter);
