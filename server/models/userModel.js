const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
type: String,
    },
    email: {
        type: String,
        required: true,
    },
    passwort: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('user', userSchema);

// changes jobsmodel into beer garden model and routes to beer garden all (URL for now)
// think about what you want to show of the beergarden (name, picture, location, pricerange) (dummys in mongoDB)
// store the coordinates of the beer garden (later)