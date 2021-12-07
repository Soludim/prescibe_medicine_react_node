const express = require('express');
const { addPatient, getPatients } = require('../controllers/patient');

const router = express.Router();

router.post('/patient', addPatient);
router.get('/patient', getPatients);

module.exports = router;