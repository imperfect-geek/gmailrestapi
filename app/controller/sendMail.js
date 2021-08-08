const axios = require("axios");
const { Buffer } = require("buffer");

if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}

const sendMail = async (req, res, next) => {
  try {
    if (
      req.isAuthenticated() &&
      req.body.to &&
      req.body.subject &&
      req.body.message //checking if request is valid and contains all required parameters
    ) {
      const mailText = `From: ${req.user.email}
To: ${req.body.to} 
Subject: ${req.body.subject} 

${req.body.message}`; //Converting message into RFC 822 Message Format

      const msgData = Buffer.from(mailText).toString("base64"); //converting mailText into base64 string
      const response = await axios({
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${req.user.accessToken}`,
        },
        data: JSON.stringify({
          message: {
            raw: msgData,
          },
        }),
        url: "https://gmail.googleapis.com/gmail/v1/users/me/drafts/",
      }); //api call to create a draft mail

      // checking if the previous api call was succesful
      if (response.status === 200) {
        const result = await axios({
          method: "post",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${req.user.accessToken}`,
          },
          data: JSON.stringify({
            id: response.data.id,
          }),
          url: "https://gmail.googleapis.com/gmail/v1/users/me/drafts/send",
        }); //api call to sent the darft created previously

        if (result.status === 200) {
          res.status(200).json({
            message: "Email sent successfully!",
          });
        } else throw new Error("Email Could not be saved! Draft Created!");
      } else throw new Error("Something went");
    } else throw new Error("Invalid Request!");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  } finally {
    next();
  }
};

module.exports = sendMail;
