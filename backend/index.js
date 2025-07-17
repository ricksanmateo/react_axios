import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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

app.post("/add", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  try {
    await db.query("INSERT INTO blog (title, description) VALUES ($1, $2)", [
      title,
      description,
    ]);
    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit", async (req, res) => {
  const id = req.body.id;
  const title = req.body.updatedTitle;
  const description = req.body.updatedDescription;

  try {
    await db.query(
      "UPDATE blog SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );
    res.redirect("/blog");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM blog WHERE id = $1", [id]);
    res.redirect("/blog");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(` App is listening on port ${port}`);
});
