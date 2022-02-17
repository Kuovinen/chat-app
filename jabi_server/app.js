const express = require("express");
const fs = require("fs");
const path = require("path");

let data = fs.readFileSync(path.resolve(__dirname, "./messageData.json"));
data = JSON.parse(data);

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.write(JSON.stringify(data));
  res.end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
