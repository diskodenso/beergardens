const express = require('express');
const router = express.Router();
const beerGardenModel = require("../models/beerGardenModel");

// Route to go to the page "/all" to see all the beergardens
// router.get('/all', (req, res) => {
//   beerGardenModel.find({}, function(err, beerGardens) {
//     if (err) {
//         res.send(err);
//         console.log(err)
//     } else {
//         res.send(beerGardens);
//         console.log(beerGardens)
//     }
//   });
// });

userRouter.post('/beergarden',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const beerGarden = new beerGarden(req.body);
    beerGarden.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            req.user.beerGardens.push(beerGarden);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created todo", msgError : false}});
            });
        }
    })
});

userRouter.get('/beerGardens',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('beerGardens').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({beerGardens : document.beerGardens, authenticated : true});
        }
    });
});
module.exports = router;
// router.get('/hello', (req, res) => {
//   res.send({ msg: 'hello route.' });
// });
// module.exports = router;