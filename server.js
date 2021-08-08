const express = require("express");
const passport = require("passport");
const session = require("express-session");
const JsonStore = require("express-session-json")(session);

//Loading contents of .env file into process.env
if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}

//passport config
require("./app/controller/passport")(passport);

const app = express();
app.use(express.json());

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new JsonStore(),
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(require("./app/routes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
