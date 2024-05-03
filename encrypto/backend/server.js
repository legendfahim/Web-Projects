const express = require("express");
const cors = require("cors");
const Cryptr = require("cryptr");
const print = require("printl");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes / APIs
app.post("/api/secret", (req, res) => {
  try {
    const cryptr = new Cryptr("myTotallySecretKey");
    const { operation, data } = req.body;
    // Encrypt the data
    if (operation === "Encryption") {
      const encryptedData = cryptr.encrypt(data);

      res.status(200).json(encryptedData);
    } else {

      // Attempt decryption
      const decryptedData = cryptr.decrypt(data);

      res.status(200).json(decryptedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error. Try again later.");
  }
});

//Server listening
const port = 3000;
app.listen(port, () => {
  print.info("Server is running on port 3000");
});
