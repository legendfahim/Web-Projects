const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    const options = {
      method: "POST",
      url: "https://url-shortener-service.p.rapidapi.com/shorten",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3ae601cd46mshc787070de6757b3p117e95jsna41f319e0be1",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      data: querystring.stringify({ url }),
    };

    const response = await axios.request(options);

   
    const shortenedUrl = response.data.result_url; 

    res.json({ shortenedUrl }); // Sending the shortened URL to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
