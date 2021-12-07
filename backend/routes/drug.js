const express = require('express');
const { addDrug, getDrugs, updateDrug, deleteDrug } = require('../controllers/drug');

const router = express.Router();

router.post('/drug', addDrug);
router.get('/drug', getDrugs);
router.patch('/drug/:id', updateDrug);
router.delete('/drug/:id', deleteDrug);

module.exports = router;