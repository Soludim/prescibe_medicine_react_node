import React from 'react';

const giveDrugTable = (props) => {

    const { drugs, onAdd, onSub } = props;

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Availability</th>
                    <th>Price ($)</th>
                    <th>Quantity</th>
                    <th>Settled</th>
                </tr>
            </thead>
            <tbody>
                {drugs.map(d =>
                    <tr key={d.drug._id}>
                        <td>{d.drug.name}</td>
                        <td>{d.drug.availability}</td>
                        <td>{d.drug.price}</td>
                        <td >
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button" onClick = {e => onSub(d)}>-</button>
                                </div>
                                <input type="number"  disabled style={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }} value={d.count} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick = {e => onAdd(d)}>+</button>
                                </div>
                            </div>
                        </td>
                        {d.settled ? 
                           <td className="text-success">True</td> : 
                           <td className="text-danger">False</td>
                        }
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default giveDrugTable;