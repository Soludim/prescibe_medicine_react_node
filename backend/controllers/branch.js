const Branch  = require('../models/branch');

exports.addBranch = (req, res) => {
    new Branch({
    location: req.body.location,
  }).save().then(result => {
    res.status(201).json({
        message: 'branch created',
        result: result
      });
  }).catch(err => {
    res.status(500).json({
        message: "Adding branch was unsuccessful"
    });
  })
}