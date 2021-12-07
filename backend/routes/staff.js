const express = require('express');
const { addStuff, stuffLogin, getStuff } = require('../controllers/staff');

const router = express.Router();

router.post('/staff', addStuff);
router.post('/staffLogin', stuffLogin);
router.get('/staff/:id', getStuff);

module.exports = router;