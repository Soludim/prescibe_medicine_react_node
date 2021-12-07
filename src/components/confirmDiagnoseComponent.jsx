import React, { Component } from 'react';
import axios from 'axios';

class ConfirmDiagnosisDiagnoseComponent extends Component {
    state = { loading: false }

    handleOnSubmit = async () => {
    const { stuff, patient, diagnosis, selectedDrugs } = this.props.location.state;
    const data = {doctor: stuff._id, patient: patient._id, branch: stuff.branch_id, diagnosis, 
                drugs: selectedDrugs};
       try {
           this.setState({loading: true});
           const response = await axios.post('http://localhost:4000/api/patientdiagnosis/diagnosis', data); 
           this.setState({loading: false});
           this.props.history.replace('/searchpatient');
       }catch(e) {
           console.log(e);
           this.setState({loading: false});
       }
    }
    render() { 
        const { patient, stuff, diagnosis, selectedDrugs, nameofDrugs } = this.props.location.state;
        return ( 
            <React.Fragment>
                  {this.state.loading ? <div className="loading">Loading&#8230;</div> : null}
                <div style={{margin: '20px', border: '1px solid #e9e9e9'}} className="container clearfix">
                    <h2 style={{textAlign: 'center'}}> Diagnosis Details</h2>
                    <p>Patient Name: {patient.firstName} {patient.lastName}</p>
                    <p>Diagnosed by: Dr {stuff.firstName} {stuff.lastName}</p>
                    <div style={{marginTop: '30px'}}>
                        <h5>Patient Complains</h5>
                        <ul>
                          {diagnosis.map(diag => <li key={diagnosis.indexOf(diag)}>{diag}</li>)}
                        </ul>
                    </div>
                    <div style={{marginTop: '30px', marginBottom: '20px'}}>
                        <h5>Drugs Prescribed</h5>
                        <ul>
                          {selectedDrugs.map(drug =>
                             <li key={selectedDrugs.indexOf(drug)}>
                                 {nameofDrugs[selectedDrugs.indexOf(drug)]} ({drug.quantity})
                            </li>)}
                        </ul>
                    </div>
                    <button style={{marginBottom: '10px'}} type="button" className="float-right btn btn-outline-primary" onClick={this.handleOnSubmit}>Submit</button>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ConfirmDiagnosisDiagnoseComponent;