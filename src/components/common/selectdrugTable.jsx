import React from 'react';

const selectDrugTable = (props) => {

    const { drugs, onAdd, onSub } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {drugs.map(drug =>
                    <tr key={drug._id}>
                        <td>{drug.name}</td>
                        <td >
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button" onClick = {e => onSub(drug)}>-</button>
                                </div>
                                <input type="number"  disabled style={{ width: '40px', textAlign: 'center', fontWeight: 'bold' }} value={drug.quantity} onChange={e => drug.quantity}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick = {e => onAdd(drug)}>+</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default selectDrugTable;