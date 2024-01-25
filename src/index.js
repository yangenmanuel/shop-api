import express from "express";
import store from "./db.json" assert { type: "json" };

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello, world!");
});

// Todos los items
app.get("/items", (req, res) => {
  res.json(store.items);
});


// Un item por el id ex: item/1
app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  const item = store.items.find((i) => i.id == id);
  res.json(item);
});


// Añadir un item ex: item?name=earbuds&?description=expensiveShit
app.post("/items", (req, res) => {
  const { name, description } = req.query;
  const id = store.items.length + 1;

  store.items.push({
    id, name, description
  })
  res.send(store)
})

// Borrar un item por el id
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  store.items = store.items.filter((i) => i.id != id);
  res.send(store)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});