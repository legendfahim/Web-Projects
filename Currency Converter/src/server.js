//import all external packages
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
dotenv.config();

//.env variables
const API_KEY = process.env.API_KEY;
const API_BASE = process.env.API_BASE;

//Middlewares of the server
app.use(bodyParser.json());
app.use(cors());
//handle post request to get data from client
app.post("/api/data", async (req, res) => {
  try {
    // Handle the incoming data here
    const { fromCurrency, toCurrency, amount } = req.body;

    //Get exchange data from external API
    const response = await axios.get(
      `${API_BASE}${API_KEY}/latest/${fromCurrency}`
    );
    const conversionRate = response.data.conversion_rates[toCurrency];
    var result = conversionRate * amount;

    // send a response back to the client
    res.status(200).json({ result });
  } catch (error) {
    //handle Error

    res.sendStatus(500);
  }
});

//Server starting point
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
