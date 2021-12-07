const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const staffSchema = new Schema({
    firstName: String,
    lastName: String,
    role: { type: Schema.Types.ObjectId, ref: 'role' },
    branch: {type: Schema.Types.ObjectId, ref: 'Branch'},
    email: String,
    password: String
});

staffSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'branch'
    }).populate({
        path: 'role'
    });
    next();
});
module.exports = mongoose.model('Stuff', staffSchema);
