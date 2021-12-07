import React, { Component } from 'react';
import SearchBox from './common/searchBox';
import PatientTable from './common/patientTable';
import axios from 'axios';

class searchPatientComponent extends Component {

    state = {allPatients: [], loading: true, searchQuery: ''}
    componentDidMount() {
        axios.get('http://localhost:4000/api/patient/patient')
        .then(res => {
            this.setState({allPatients: res.data.data, loading: false});
        }).catch(err => {
            this.setState({loading: false});
            alert('An unknown error occured');
        });
    }

    handleSearch = query => {
        this.setState({ searchQuery: query});
    }

    handleDiagnose = (patient) => {
        this.props.history.push('/patientdiagnose', {stuff: this.props.location.state.stuff, patient});
    }
    getData = () => {
        const { searchQuery, allPatients } = this.state;
        let filtered = allPatients;
        if (this.state.searchQuery)
          filtered = allPatients.filter(m => m.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()));
          return filtered;
    }

    render() { 
        const { loading, allPatients, searchQuery } = this.state;
        return ( 
            <React.Fragment>
                {loading ?  <div className="loading">Loading</div>: null}
                {allPatients ? 
                <div className="container">
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <PatientTable patients={this.getData()} OnDiagnose={this.handleDiagnose}/>
                </div> : null}  
            </React.Fragment>
         );
    }
}
 
export default searchPatientComponent;