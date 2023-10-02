const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const passport = require("passport");
const passportStratergy = "./config/passport";
const router = require("./routes/routes");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport as library initialize and passport add different property in req
app.use(passport.initialize());

app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server is giving an error: ${err}`);
  } else {
    console.log(`Server is running Successfully`, "127.0.0.1:8000");
  }
});
