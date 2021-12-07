const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientRoutes = require('./routes/patient');
const roleRoutes = require('./routes/role');
const staffRoutes = require('./routes/staff')
const branchRoutes = require('./routes/branch');
const drugRoutes = require('./routes/drug');
const patientDiagnosis = require('./routes/patient_diagnosis');


const mongoUrl = 'mongodb://localhost:27017/hospital';
const PORT = 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res => {
    console.log('database connected successfully');
}).catch(err => {
    console.log(err);
});

app.use('/api/patientdiagnosis', patientDiagnosis);
app.use('/api/drug', drugRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/patient', patientRoutes);

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});