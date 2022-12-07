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

/**
 * Routes
 */
app.use("/cardlist", cardRouter);

