import React from 'react';

const PatientTable = (props) => {

    const { patients, OnDiagnose } = props;
    return ( 
        <table className="table">
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {patients.map(patient =>
                <tr key={patient._id}>
                    <td>{patients.indexOf(patient) + 1}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>
                        <button onClick={() => OnDiagnose(patient)} className="btn btn-secondary btn-sm">Diagnose</button>
                    </td>
                </tr>)}
        </tbody>
    </table>
     );
}
 
export default PatientTable;