
// const cors = require('cors');
// const mongoose = require('mongoose');
// const express = require('express');
// const mongoURI = require("./config.js").mongoURI;
// const options = require("./config.js").options;
// const { urlencoded } = require('express');
// const passport = require(`passport`);
// const jwtStragedy = require("./passport");

// // Initialize express app
// const app = express();
// const port = process.env.PORT || 5000;
// console.log(mongoURI);
// // connect to Database
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
//   .then(() => console.log('Connection to Mongo DB established'))
//   .catch(err => console.log(err));

// app.use(urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
// // initilize passport (middleware)
// app.use(passport.initialize());
// passport.use("jwt", jwtStragedy);

// app.use("/beergardens", require("./routes/beerGardens"));
// app.use("/users", require("./routes/users"));

// // last thing that happens 
// app.listen(port, () => {
//     console.log("hello world")
//   console.log('Server is running on ' + port + 'port');
// });

const express = require('express');
const app = express(); 
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userModel = require("./models/userModel");
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect("mongodb+srv://baby:babybaby@my-project.nlinz.mongodb.net/myDataBase?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log("successfully connected to Database");
  });
 app.listen(port, () => {
console.log("hello world")
console.log('Server is running on ' + port + 'port');
});
// app.listen(5000, () => {
//     console.log("express server started")
// }); // change it back to how we did it in the course