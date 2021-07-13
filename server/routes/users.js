// first code for creating a user route
// const express = require('express');
// const router = express.Router();
// const userModel = require("../models/userModel");
// const bcrypt = require('bcrypt');
// const secretOrKey = require("../config.js").secretOrKey;
// var jwt = require('jsonwebtoken');
// const passport = require(`passport`);


// router.post("/register", (req, res) => {
//     console.log(req.body)
//     const reqEmail = req.body.email
//     const reqUsername = req.body.userName
//     const reqPassword = req.body.password

//     userModel.findOne({ email: reqEmail }, (err, user) => {
//         if (err) {
//             res.json({ "error": err })
//         }
//         if (user) {
//             res.send("Email is already in use!")
//         } else {
//             bcrypt.genSalt(10, function (err, salt) {
//                 bcrypt.hash(reqPassword, salt, function (err, hash) {
//                     // Store hash in your password DB.
//                     console.log(hash);
//                     const newUser = new userModel({
//                         userName: reqUsername ? reqUsername : "",
//                         email: reqEmail,
//                         password: hash,
//                     })
//                     newUser.save()
//                         .then(user => {
//                             res.send(user);
//                         });
//                         .catch((err) => {
//                             res.send(err);
//                         });
//                 });
//             });
//         }
//     });
// });

// router.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     userModel.findOne({ email: email }, (err, user) => {
//         console.log(password);
//         if (err) {
//             res.send("email does not exist")
//         } else {
//             bcrypt.compare(password, user.password, function (err, result) {
//                 // result == true
//                 console.log(result);
//                 if (err) {
//                     res.send(err)
//                 }
//                 if (result) {
//                     const options = {
//                         id: user._id,
//                     };
//                    const token = jwt.sign(
//                         options,
//                         secretOrKey,
//                        { expiresIn: '8h' });
//                     console.log(token);
//                     res.json({
//                         success: true,
//                         token: token,
//                     });
//                 } else {
//                     res.send("password does not match")
//                 }
//             });
//         }
//     })
// });

// router.get(
//     "/profile",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         console.log(req.user);
//         if (req.user){
//             res.status(200).send(req.user)
//         } else {
//             res.status(401).send("unauthorized")
//         }
//     }
// );
// module.exports = router;
// // router.get('/hello', (req, res) => {
// //   res.send({ msg: 'hello route.' });
// // });
// // module.exports = router;

// second code creating a user route

const express = require('express');
const userRouter = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const passport = require(`passport`);
const passportConfig = require("../passport");
const beerGarden = require("../models/beerGardenModel.js");
const JWT = require(`jsonwebtoken`);
const { json } = require('express');

const signToken = userID => {
    return JWT.sign({
        iss: "Testperson",
        sub: userID
    }, "Testperson", {expiresIn: "1h"});
}
userRouter.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    User.findOne({ username }, (err, user) => {
        // if there is an error there is an error searching this username within the database
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Username already taken", msgError: true } });
        else {
            const newUser = new User({ username, email, password });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: true } });

            });
        }

    });
});
userRouter.post("/login", passport.authenticate(`local`, {session: false,}), (req,res)=> {
    if (req.isAuthenticated()) {
        const { _id, username, email } = req.user;
        const token = signToken(_id);
        // httpOnly is gonna make that you cant touch the cookie from the client site to prevent cross-side scrypting attacks
        // sameSite is to prevent cross side request fortary attacks - really important to make sure you JWT Token dont get stolen
        res.cookie(`access token`, token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, email } });
    }
});
userRouter.get("/logout", passport.authenticate(`jwt`, {session: false,}), (req,res)=> {
    res.clearCookie(`access token`);
    res.json({ user: { username: "", email: "" }, success: true });
});

// creating a 
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,email} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,email}});
});
module.exports = userRouter;