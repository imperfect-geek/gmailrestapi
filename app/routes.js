const express = require("express");
const passport = require("passport");
const sendMail = require("./controller/sendMail");

const app = express();
const router = new express.Router();
app.use(router);

// @desc   Auth with google
// @route  GET /auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.compose",
    ],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

// @desc   Google Auth callback
// @route  GET /auth/google/callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.json({
      code: 200,
      status: "success",
      message: "Google Authentication successful!",
    });
  }
);

// @desc   Failure redirect
// @route  GET /auth/failure
router.get("/auth/failure", (req, res) => {
  res.json({
    code: 400,
    status: "failure",
    message: "Google Authentication failed!",
  });
});

// @desc   Logout route
// @route  GET /logout
router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    code: 200,
    status: "success",
    message: "Logged Out!",
  });
});

// @desc       Route for sending mails
// @route      POST /sendmail
// @req-body   name: String, subject: String, message: String
router.post("/sendmail", sendMail);

module.exports = router;
