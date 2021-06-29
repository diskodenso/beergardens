
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const mongoURI = require("./config.js").mongoURI;
const options = require("./config.js").options;
const { urlencoded } = require('express');
const passport = require(`passport`);
const jwtStragedy = require("./passport");

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;
console.log(mongoURI);
// connect to Database
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connection to Mongo DB established'))
  .catch(err => console.log(err));

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// initilize passport (middleware)
app.use(passport.initialize());
passport.use("jwt", jwtStragedy);

app.use("/beergardens", require("./routes/beerGardens"));
app.use("/users", require("./routes/users"));

// last thing that happens 
app.listen(port, () => {
    console.log("hello world")
  console.log('Server is running on ' + port + 'port');
});

