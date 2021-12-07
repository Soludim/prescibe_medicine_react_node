const Patient  = require('../models/patient');

exports.addPatient = (req, res) => {
    new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }).save().then(result => {
    res.status(201).json({
        message: 'patient created',
        result
      });
  }).catch(error => {
    res.status(500).json({
        message: "Adding patient was unsuccessful"
    });
  })
}

exports.getPatients = (req, res) => {
 Patient.find((error, doc) => {
    if (error) {
      return res.status(500).json({
        message: 'Retrieving all patients was unsuccesful'
      });
    }
    res.status(200).json({
      message: 'Retrieving all patients was successful',
      data: doc
    });
 })
}