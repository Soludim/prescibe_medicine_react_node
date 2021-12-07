const Stuff = require('../models/staff');
const bcrypt = require('bcryptjs');

exports.addStuff = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
      const stuff = new Stuff({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,                  //the particular role
        branch: req.body.branch        //the particular branch
      });
      stuff.save().then(result => {
        res.status(201).json({
          message: 'stuff created successfully',
          result: result
        });
      }).catch(err => {
        res.status(500).json({
          message: "Adding stuff was unsuccessful"
        });
      })
    }).catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    });
};

exports.getStuff = async(req, res) => {
   if (req.params.id) {
     let stuff = await Stuff.find({_id:req.params.id});

     return res.status(200).json({
      status: "success",
      stuff
    })
     
   }
}

exports.stuffLogin = (req, res) => {
  let fetchedStuff;
  Stuff.findOne({ email: req.body.email })
  .then(stuff => {
    if (!stuff) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    
    fetchedStuff = stuff;
    return true; //bcrypt.compare(req.body.password, stuff.password);
  })
  .then(result => {
     if (!result) {
       return res.status(401).json({
         message: 'Authentication failed'
       })
     }
       if (!fetchedStuff) return;

       res.status(200).json({
         auth: true,
         message: 'Authentication successfully done',
         stuff: fetchedStuff
       });
  })
  .catch(error => {
    console.log(error);
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    })
  })
}
