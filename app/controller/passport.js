const GoogleStratergy = require("passport-google-oauth20");
const fs = require("fs");
const { resolve } = require("path");

//loading user.json
const fileLocation = resolve(__dirname, "../model/user.json");
const data = fs.readFileSync(fileLocation, "utf8"); // readig file
const obj = JSON.parse(data); //now it an object

//Google Oauth stratergy
const googleAuth = (passport) => {
  passport.use(
    new GoogleStratergy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          accessToken,
          refreshToken,
        };
        const userIndex = obj.findIndex((User) => User.googleId === profile.id); //checking if user exists
        if (userIndex > -1) {
          obj[userIndex] = newUser; //replaces the old data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFileSync(fileLocation, json, "utf8"); //storing the data
        } else {
          obj.push(newUser); //add some data
          json = JSON.stringify(obj);
          fs.writeFileSync(fileLocation, json, "utf8");
        }
        cb(null, newUser);
      }
    )
  );

  //serializing user as required by passport.js
  passport.serializeUser((user, done) => {
    done(null, user.googleId);
  });

  //deserializing user as required by passport.js
  passport.deserializeUser((id, done) => {
    const user = obj.find((User) => User.googleId === id);
    done(null, user);
  });
};

module.exports = googleAuth;
