//Imports modules
const express = require("express");
const dotenv = require("dotenv");
const print = require("printl");
const mongoose = require("mongoose");
const cors = require("cors");
const createRouter = require("./routes/createApi");
const readRouter = require("./routes/readApi");
const noteSchema = require("./models/noteSchema");
dotenv.config();

//DB connection
db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    print.wrn("DB connected");
  } catch (error) {
    console.error(error);
  }
};

db(); // Call the db function to establish the connection

const app = express();
//Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", createRouter);
app.use("/api", readRouter);

//Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  print.info(`Server Running ${port}`);
});
