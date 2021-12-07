const Drug  = require('../models/drug');

exports.addDrug = (req, res) => {
    new Drug({
    name: req.body.name,                       //name of the drug
    availability: req.body.availability,        //quantity of drug available
    price: req.body.price                  //price of drug
  }).save().then(result => {
    res.status(201).json({
        message: 'drug created',
        result: result
      });
  }).catch(err => {
    res.status(500).json({
        message: "Adding drug was unsuccessful"
    });
  })
}

exports.getDrugs = (req, res) => {
  Drug.find((err, doc) => {
    if (err) {
      return res.status(500).json({
        message: 'An error occured whiles getting drugs'
      });
    }

    res.status(200).json({
      message: 'Getting drugs was successful',
      data: doc
    });
  })
}

exports.updateDrug = async (req, res) => {
  const drug = await Drug.findByIdAndUpdate(
           req.params.id,
           {
             availability: req.body.availability,
           },
           { new: true, useFindAndModify: false }
         );
  if (!drug) {
    return res.status(401).json({
      message: 'Invalid drug id'
    });
  }

  res.status(201).json({
    message: 'drug updated successfully'
  });
}

exports.deleteDrug = async (req, res) => {
  const drug = await Drug.findByIdAndDelete(req.params.id);

  if (!drug) {
    return res.status(501).json({
      message: 'deleting drug was not successful'
    });
  }

  return res.status(201).json({
    message: 'drug deleted successfully'
  });
}