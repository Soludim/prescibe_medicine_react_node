import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import PatientDiagnose from './components/patientDiagnosisComponent';
import searchPatientComponent from './components/searchPatientComponent';
import confirmDiagnose from './components/confirmDiagnoseComponent';
import patientDiagnosisComponent from './components/patientPharmacyComponent';
import selectDrugComponent from './components/selectDrugComponent';
import settledrugsComponent from './components/settlePatientDrugsComponent';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
   <Switch>
      <Route path='/login' component={Login} />
      <Route path="/patientdiagnose" component={PatientDiagnose} />
      <Route path='/searchpatient' component={searchPatientComponent} />
      <Route path="/confirmdiagnosis" component={confirmDiagnose} />
      <Route path="/selectdrug" component={selectDrugComponent} />
      <Route path="/patientpharm" component={patientDiagnosisComponent} />
      <Route path="/settledrugs" component={settledrugsComponent} />
   </Switch>
  );
}

export default App;
