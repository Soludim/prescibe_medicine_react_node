const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    location: String
});

module.exports = mongoose.model('Branch', branchSchema);