const mongoose = require('mongoose');
const bcrypt = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    beerGardens:[{type: moongose.Schema.Types.ObjectID, ref:"beerGarden"}]
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    bcrypt.hash(this.password, 10,(err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    });
}

module.exports = mongoose.model('User', userSchema);

// changes jobsmodel into beer garden model and routes to beer garden all (URL for now)
// think about what you want to show of the beergarden (name, picture, location, pricerange) (dummys in mongoDB)
// store the coordinates of the beer garden (later)