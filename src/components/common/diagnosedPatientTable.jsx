import React from 'react';

const diagnosePatientTable = (props) => {

    const { data, onSelect } = props;
    return ( 
        <table className="table">
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Data of Diagnosis</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {data.map(datum =>
                <tr key={datum._id}>
                    <td>{data.indexOf(datum) + 1}</td>
                    <td>{datum.patient.firstName}</td>
                    <td>{datum.patient.lastName}</td>
                    <td>{datum.date}</td>
                    <td>
                        <button onClick={() => onSelect(datum)} className="btn btn-secondary btn-sm">Select</button>
                    </td>
                </tr>)}
        </tbody>
    </table>
     );
}
 
export default diagnosePatientTable;