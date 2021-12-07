const express = require('express');
const { addDiagnosis, getallUncheckedPatientDiagnosis, checked } = require('../controllers/patient_diagnosis');

const router = express.Router();

router.post('/diagnosis', addDiagnosis);
router.get('/alldiagnosis', getallUncheckedPatientDiagnosis);
router.patch('/checked/:id', checked);

module.exports = router;