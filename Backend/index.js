const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const DbConnect = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    res.status(500).send(err);
  });
});

DbConnect();

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}..`);
});
