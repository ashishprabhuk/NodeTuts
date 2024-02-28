const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
app.use(express.json());

const PORT = 8000;
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const products = data.products;

// # CRUD

// * Create POST /products
app.post("/products", (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json(product);
});

// * Read GET /products
app.get("/products", (req, res) => {
  res.json(products);
});
// * Read GET /products/:id
app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

// * Update PUT /products/:id
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products[productIndex] = req.body;
  res.status(201).json();
});
// alternative to above method
/*
app.put('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  products.splice(productIndex,1,{...req.body, id:id})
  res.status(201).json();
});
*/

// * Update PATCH /products/:id
app.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.status(201).json();
});
// alternative to above method
/*
app.patch('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(p=>p.id===id)
  const product = products[productIndex];
  products.splice(productIndex,1,{...product,...req.body})
  res.status(201).json();
});
*/

// * Delete DELETE /products/:id
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex,1)
  res.status(201).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});