import React, { Component } from 'react';
import axios from 'axios';
import GiveDrugTable from './common/givedrugTable';

class SettlePatientDrugs extends Component {
    state = { loading: false, searchQuery: '', drugs: [] }

    componentDidMount() {
        this.setState({ loading: false });
        axios.get('http://localhost:4000/api/drug/drug')
            .then(res => {
                var prescribed_drugs = [];
                this.props.location.state.diagnoseDetails.drugs.forEach(d => {
                    res.data.data.map(drug => {
                        if (d.drug._id === drug._id)
                            prescribed_drugs = [...prescribed_drugs, d];
                    })
                });
                prescribed_drugs.forEach(element => {
                    element.count = 0;   //amount given
                    element.settled = false;
                });
                console.log(prescribed_drugs);
                this.setState({ loading: false, drugs: prescribed_drugs });
            }).catch(err => {
                this.setState({ loading: false });
                console.log(err);
                alert('An error occured');
            })
    }

    handleAddDrug = (drug) => {
        let count = this.state.count;
        if (drug.drug.availability > 0 && drug.count < drug.quantity) {
            ++drug.count;
            --drug.drug.availability;
            this.setState({ count });
        }
        this.checkSettled(drug);
    }

    handleSubDrug = (drug) => {
        let count = this.state.count;
        if (drug.count >= 1) {
            --drug.count;
            ++drug.drug.availability;
            this.setState({ count });
        }
        this.checkSettled(drug);
    }

    checkSettled = (drug) => {
        if (drug.count >= drug.quantity) {
            //drug has been given to patient in full quantity
            drug.settled = true;
        } else {
            drug.settled = false;
        }
        this.setState({ drug });
    }

    calculateTotalDrugPrice = (drugs) => {
       let price = 0;
       drugs.forEach(d => {
         price += d.count * d.drug.price;
       })

       return price;
    }

    handleSubmit = async () => {
       const { diagnoseDetails } = this.props.location.state;
       const drugs = this.state.drugs;
       drugs.forEach(async d => {
           if (d.drug.availability <= 0) {
               await axios.delete('http://localhost:4000/api/drug/drug/'+ d.drug._id);
           } else {
               await axios.patch('http://localhost:4000/api/drug/drug/'+ d.drug._id, d.drug);
           }
       });
       console.log(drugs)
       try {
        await axios.patch('http://localhost:4000/api/patientdiagnosis/checked/'+ diagnoseDetails._id);
       }catch(e) {
          console.log(e);
       }
      
       this.props.history.replace('/patientpharm');
    }


    render() {
        const { diagnoseDetails } = this.props.location.state;
        const { loading, drugs } = this.state;
        return (
            <React.Fragment>
                {loading ? <div className="loading">Loading</div> : null}
                <div>
                    <h2 style={{ textAlign: 'center' }}>
                        Diagnosis Details
                        </h2>
                    <div className="container clearfix" style={{ border: 1 + 'px solid #e9e9e9', padding: 30 + 'px', marginTop: 20 + 'px' }}  >
                        <h5>Patient Name: {diagnoseDetails.patient.firstName}  {diagnoseDetails.patient.lastName} </h5>
                        <h6>Diagnosed by: Dr {diagnoseDetails.doctor.firstName}  {diagnoseDetails.doctor.lastName}</h6>

                        {drugs.length <= 0 ?
                            <p style={{ textAlign: 'center' }}>No drugs prescribed</p>
                            :
                            <React.Fragment>
                                <div style={{ marginTop: '40px' }}>
                                    <p style={{ fontWeight: 'bold' }}>Prescribed Drugs and Quantity</p>
                                    <ul>
                                        {diagnoseDetails.drugs.map(drug => {
                                            return <li key={drug._id}>{drug.drug.name}  ({drug.quantity})</li>
                                        })}
                                    </ul>
                                </div>
                                <div style={{ marginTop: '80px' }}>
                                    {
                                        <GiveDrugTable drugs={drugs} onAdd={this.handleAddDrug} onSub={this.handleSubDrug} />
                                    }
                                </div>
                                <div style={{ border: '1px solid #e9e9e9', textAlign: 'center', marginTop: '10px', width: '200px'}}>
                                <p>Total Price <span style={{fontWeight: "bold" }}> ${this.calculateTotalDrugPrice(drugs)}</span></p>
                                </div>
                            </React.Fragment>
                        }
                        <button onClick={this.handleSubmit} className="btn btn-secondary btn-sm float-right" style={{ marginTop: '50px' }}>
                            Submit
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SettlePatientDrugs;