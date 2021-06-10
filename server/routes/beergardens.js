const express = require('express');
const router = express.Router();
const beerGardenModel = require("../models/beerGardenModels");

router.get('/all', (req, res) => {
  beerGardenModel.find({}, function(err, beerGardens) {
    if (err) {
        res.send(err);
        console.log(err)
    } else {
        res.send(beerGardens);
        console.log(beerGardens)
    }
  });
});

module.exports = router;
// router.get('/hello', (req, res) => {
//   res.send({ msg: 'hello route.' });
// });
// module.exports = router;