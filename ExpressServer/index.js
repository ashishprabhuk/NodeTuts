const express = require("express");
const path = require("path");
const fs = require("fs");

const port = 8000;
const filePath = path.join(__dirname, "index.html");
const index = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const products = data.products;

const server = express();

/*
Express middleware functions are executed sequentially as defined. 
They can pass control to the next middleware using `next()`. 
Modifies the request before it reaches the next middleware or endpoints.
Sequence of middleware is very important, as first middleware is first traversed by request.

Middle-wares can be used for many use cases, like loggers, authentication, parsing data etc.
*/
// # Middlewares
server.use(express.json()); // for body parsing application/json
// server.use(express.urlencoded());
server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    new Date(),
    req.get("User-Agent")
  );
  next();
});
server.use(
  express.static("public")
); /* for static files like css, js, images...*/
/* you can access the static files by going to http://localhost:8000/index.html */

const auth = (req, res, next) => {
  console.log("Auth middleware");
  if (req.query.password) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// # API - Endpoints - Routes
server.get("/", auth, (req, res) => {
  res.json({ type: "GET" });
});
server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});
server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.get("/demo", (req, res) => {
  /* by default it sets the content type to text/html */
  // res.sendStatus(404);
  res.status(201).send("<h1>Hello World</h1>");
  // res.send(index);
  // res.json(data);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
