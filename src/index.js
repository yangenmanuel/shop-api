import express from "express";
import store from "./db.json" assert { type: "json" };

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello, world!");
});

app.get("/items", (req, res) => {
  res.json(store.items);
});

app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const item = store.items.find((i) => i.id == id);
  res.json(item);
});

app.post("/items", (req, res) => {
  const { name, description } = req.query;
  const id = store.items.length + 1;

  store.items.push({
    id, name, description
  })
  res.send(store)
})

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  store.items = store.items.filter((i) => i.id != id);
  res.send(store)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});