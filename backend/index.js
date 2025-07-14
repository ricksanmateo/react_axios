import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "sanmateo",
  port: 5432,
});

db.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  console.log("connected to postgres");
});

app.get("/blog", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blog ORDER BY id ASC");
    res.send(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(` App is listening on port ${port}`);
});
