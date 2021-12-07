const express = require('express');
const { addBranch } = require('../controllers/branch');

const router = express.Router();

router.post('/addBranch', addBranch);

module.exports = router;