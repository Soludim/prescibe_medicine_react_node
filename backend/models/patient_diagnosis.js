const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patient_diagnosis = new Schema({
    doctor: {type: Schema.Types.ObjectId, ref: 'Stuff'},
    patient: {type: Schema.Types.ObjectId,  ref: 'Patient'},
    branch: {type: Schema.Types.ObjectId, ref: 'Branch'},
    diagnosis: [String],
    drugs: [{
        drug: {type: Schema.Types.ObjectId, ref: 'Drug'},
        quantity: Number
    }],
    date: String,
    checked: Boolean
});

patient_diagnosis.pre(/^find/, function(next) {
    this.populate({
        path: 'patient'
    }).populate({
        path: 'drugs.drug'
    }).populate({
        path: 'doctor'
    });
    next();
});

module.exports = mongoose.model('patientDiagnosis', patient_diagnosis);