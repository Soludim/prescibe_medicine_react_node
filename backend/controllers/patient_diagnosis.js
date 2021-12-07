const PatientDiagnosis = require('../models/patient_diagnosis');

exports.addDiagnosis = (req, res) => {
  new PatientDiagnosis({
    doctor: req.body.doctor,           //this doctor_id points to the stuff table
    patient: req.body.patient,         //this patient_id points to the patient table
    branch: req.body.branch,          //branch where the diagnosis was taken place
    diagnosis: req.body.diagnosis,          //list of patients symptoms
    drugs: req.body.drugs,
    date: getDate(),
    checked: false                 //list of all the prescribed drugs
  }).save().then(result => {
    res.status(201).json({
      message: 'patient diagnosis was successful',
      result: result
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: "patient diagnosis was unsuccessful"
    });
  })
};

exports.getallUncheckedPatientDiagnosis = (req, res) => {
  PatientDiagnosis.find((err, doc) => {
    if (err) {
      return res.status(500).json({
        message: 'An error occured whiles getting all patient diagnosis'
      });
    }
    var uncheckedPatients = [];
    doc.forEach(i => {
      if (!i.checked) {
        uncheckedPatients = [...uncheckedPatients, i];
      }
    })
    res.status(200).json({
      message: 'Getting all patient diagnosis was successful',
      data: uncheckedPatients
    });
  })
}


function getDate() {
  const date = new Date();
  const now = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ',' + days(date.getDay());
  return now;
}

function days(pos) {
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfTheWeek[pos];
}

exports.checked = async (req, res) => {
  const drug = await PatientDiagnosis.findByIdAndUpdate(
    req.params.id,
    {
      checked: true
    },
    { new: true, useFindAndModify: false }
  );
  if (!drug) {
    return res.status(401).json({
      message: 'Invalid id'
    });
  }

  res.status(201).json({
    message: 'patient status changed successfully'
  });
}