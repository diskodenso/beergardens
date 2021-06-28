const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

router.post("/register", (req, res) => {
    console.log(req.body)
    const reqEmail = req.body.email
            const reqUsername = req.body.userName
    const reqPasswort = req.body.password

    userModel.findOne({ email: reqEmail }, (err, user) => {
        if (err) {
            res.json({"error": err})
        }
        if (user){ 
            res.send("Email is already in use!")
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(reqPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        const newUser = new userModel({
            username: reqUsername ? reqUsername : "",
            email: reqEmail,
            password: reqPassword,
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
    })
})

module.exports = router;
// router.get('/hello', (req, res) => {
//   res.send({ msg: 'hello route.' });
// });
// module.exports = router;