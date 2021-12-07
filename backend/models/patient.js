const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: String,
    lastName: String
});

patientSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});


module.exports = mongoose.model('Patient', patientSchema);