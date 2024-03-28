const print = require("printl");
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs")

app.use(cors());

app.get("/api/v1/e2b", (req, res) => {
   res.sendFile(__dirname + "/BengaliDictionary.json");
});



app.listen(3000, () => {
  print.info("Server started");
});
