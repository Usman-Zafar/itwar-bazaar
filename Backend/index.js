const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");

const routes = require("./routes/index");
const DbConnect = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(routes);

DbConnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}..`);
});
