
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const mongoURI = require("./config.js").mongoURI;
const { urlencoded } = require('express');

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

app.use("/beergardens", require("./routes/beerGardens"));

// last thing that happens 
app.listen(port, () => {
    console.log("hello world")
  console.log('Server is running on ' + port + 'port');
});

