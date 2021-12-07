const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
    name: String,
    availability: Number,
    price: Number
});

module.exports = mongoose.model('Drug', drugSchema);