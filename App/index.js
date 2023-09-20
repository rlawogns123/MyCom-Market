const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
// const port = process.env.PORT || 4000;
const port = 4000;
const config = require("./server/config/key.js");

// app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/product", require("./server/router/product.js"));
// app.use("/api/user", require("./server/router/user.js"));
// app.use("/api/reple", require("./server/router/reple.js"));
// app.use("/image", express.static("./image"));

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

app.listen(port);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
