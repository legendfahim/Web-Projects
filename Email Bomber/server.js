//Imports all necessary modules
const express = require("express");
const print = require("printl");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

//middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SMTP setup
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

//Sendmail function
async function sendMail(to, subject, text, emailNumber) {
  try {
    //Mail options for send Mail
    let mailOptions = {
      from: "hackerfunworld@gmail.com",
      to: to,
      subject: `${subject} ${emailNumber}`, // Append email number to the subject
      text: text,
    };

    let info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Send Mail API
app.post("/api/mail/send", async (req, res) => {
  // Get data from request body
  const {
    "receiver-email": receiverEmail,
    subject: subject,
    "num-emails": numEmail,
    "email-body": message,
  } = req.body;
  //   console.log(req.body);

  try {
    // Send emails concurrently
    await Promise.all(
      Array.from(
        { length: numEmail },
        async (_, index) =>
          await sendMail(receiverEmail, subject, message, index + 1) // Increment index by 1 to start from 1
      )
    );

    // All emails sent successfully
    res.status(200).json({
      status: "success",
      message: "All mails sent successfully",
      "Number-of-mails": numEmail,
    });
  } catch (error) {
    // Error occurred while sending emails
    res.status(404).json({
      status: "Not Found",
      message: "Failed to send emails",
    });
  }
});

//Server Port
const port = process.env.PORT || 5000;
//Server Listen
app.listen(port, () => {
  print.info(`Server is running on port ${port}`);
});
