const mongoose = require('mongoose');

const beerGardenSchema = new mongoose.Schema({
    picture: {
        type: String,
    },
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    price_range: {
        type: String,
        required: true,

    },
    opening_hours: {
        type: String,
        required: true,

    },
    location: {
        type: String,
        required: true,
        unique: true,
        required: true,

    },
    notes: {
        type: String,
    }
});
module.exports = mongoose.model('beerGarden', beerGardenSchema);

// changes jobsmodel into beer garden model and routes to beer garden all (URL for now)
// think about what you want to show of the beergarden (name, picture, location, pricerange) (dummys in mongoDB)
// store the coordinates of the beer garden (later)