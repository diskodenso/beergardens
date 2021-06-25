const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/register", (req, res) => {
    console.log(req.body)
})

module.exports = router;
// router.get('/hello', (req, res) => {
//   res.send({ msg: 'hello route.' });
// });
// module.exports = router;