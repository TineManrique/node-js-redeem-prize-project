const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrizeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

module.exports = Prize = mongoose.model('Prize', PrizeSchema);