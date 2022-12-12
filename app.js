import express from "express";
import cors from "cors";

import cardRouter from "./routes/cardlist.routes";

const app = express();
const port = process.env.PORT || 3001;
const db = require("./database");

app.use(cors());
app.listen(port, () =>
  console.log(`VGB CardList Server is listening on port ${port}!`)
);

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB!");
});

var interval = setInterval(async () => {
  const testCon = await db.promise().query("SELECT 1");
  //console.log(testCon[0]);
}, 60000);

/**
 * Routes
 */
app.use("/cardlist", cardRouter);



