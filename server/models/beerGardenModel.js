const mongoose = require('mongoose');

const beerGardenSchema = new mongoose.Schema({
    picture: {
type: String,
        required: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,        
    },
    price_range: {
        type: String,
    },
    opening_hours: {
        type: String,
    },
    location: {
        type: String,
    },
    notes: {
        type: String,
    }
});
module.exports = mongoose.model('beerGarden', beerGardenSchema);

// changes jobsmodel into beer garden model and routes to beer garden all (URL for now)
// think about what you want to show of the beergarden (name, picture, location, pricerange) (dummys in mongoDB)
// store the coordinates of the beer garden (later)