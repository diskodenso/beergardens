const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const secretOrKey = require("../config.js").secretOrKey;
var jwt = require('jsonwebtoken');
const passport = require(`passport`);


router.post("/register", (req, res) => {
    console.log(req.body)
    const reqEmail = req.body.email
    const reqUsername = req.body.userName
    const reqPassword = req.body.password

    userModel.findOne({ email: reqEmail }, (err, user) => {
        if (err) {
            res.json({ "error": err })
        }
        if (user) {
            res.send("Email is already in use!")
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(reqPassword, salt, function (err, hash) {
                    // Store hash in your password DB.
                    console.log(hash);
                    const newUser = new userModel({
                        userName: reqUsername ? reqUsername : "",
                        email: reqEmail,
                        password: hash,
                    })
                    newUser.save()
                        .then(user => {
                            res.send(user);
                        })
                        .catch((err) => {
                            res.send(err);
                        });
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.findOne({ email: email }, (err, user) => {
        console.log(password);
        if (err) {
            res.send("email does not exist")
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                console.log(result);
                if (err) {
                    res.send(err)
                }
                if (result) {
                    const options = {
                        id: user._id,
                    };
                   const token = jwt.sign(
                        options,
                        secretOrKey,
                       { expiresIn: '8h' });
                    console.log(token);
                    res.json({
                        success: true,
                        token: token,
                    });
                } else {
                    res.send("password does not match")
                }
            });
        }
    })
});

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        console.log(req.user);
        if (req.user){
            res.status(200).send(req.user)
        } else {
            res.status(401).send("unauthorized")
        }
    }
);
module.exports = router;
// router.get('/hello', (req, res) => {
//   res.send({ msg: 'hello route.' });
// });
// module.exports = router;