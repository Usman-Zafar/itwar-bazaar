const express = require("express");
const app = express();
const multer = require("multer");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const DbConnect = require("./db/connect");
const userRoutes = require("./routes/user");

const storage = multer.memoryStorage(); // This keeps the data in memory
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.json());
app.use("/user", upload.none(), userRoutes);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    res.status(500).send(err);
  });
});

DbConnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on Port:${port}..`);
});
