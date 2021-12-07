import React, { Component } from 'react';
import SearchBox from './common/searchBox';
import DiagnosePatientTable from './common/diagnosedPatientTable';
import axios from 'axios';

class PatientPharmacyComponent extends Component {
    state = { patients: [], loading: false, searchQuery: '' }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('http://localhost:4000/api/patientdiagnosis/alldiagnosis')
        .then(res => {
            console.log(res.data.data)
            this.setState({patients: res.data.data});
            this.setState({loading: false});
        }).catch(err => {
            this.setState({loading: false});
            alert('An unknown error occured');
        })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query});
    }

    handleGiveDrug = (patient) => {
       this.props.history.push('/settledrugs', {diagnoseDetails: patient});
       console.log(patient);
    }

    getData = () => {
        const { searchQuery, patients } = this.state;
    
        let filtered = patients;
        if (this.state.searchQuery)
          filtered = patients.patient.filter(m => m.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()));
          return filtered;
    }
    
    render() { 
        const { loading, patients, searchQuery } = this.state;
        return ( 
        <React.Fragment>
            {loading ?  <div className="loading">Loading</div>: null}
            {patients ? 
                <div className="container">
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <DiagnosePatientTable data={patients} onSelect={this.handleGiveDrug}/>
                </div> : null}
        </React.Fragment> );
    }
}
 
export default PatientPharmacyComponent;