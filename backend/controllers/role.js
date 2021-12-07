const Role  = require('../models/role');

exports.addRole = (req, res) => {
    new Role({
        name: req.body.name,
      }).save().then(result => {
        res.status(201).json({
            message: 'role created successfully',
            result: result
          });
      }).catch(err => {
        res.status(500).json({
            message: "Adding role was unsuccessful"
        });
      })
}