import React, { Component } from 'react';
import axios from 'axios';
import SearchBox from './common/searchBox';
import SelectDrugTable from './common/selectdrugTable';

class SelectDrug extends Component {
    state = { loading: false, drugs: [], searchQuery: '' }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('http://localhost:4000/api/drug/drug')
            .then(res => {
                res.data.data.forEach(element => {
                    element.quantity = 0;
                });
                this.setState({ loading: false, drugs: res.data.data });
                console.log(this.props.location.state);
            }).catch(err => {
                this.setState({ loading: false });
                alert('An error occured');
            })
    }

    handleAddDrug = (drug) => {
        let quantity = this.state.quantity;
        ++drug.quantity;
        this.setState({ quantity });
    }

    handleSubDrug = (drug) => {
        let quantity = this.state.quantity;
        if (drug.quantity >= 1) {
            --drug.quantity;
            this.setState({ quantity });
        }
    }

    handleSearch = query => {
        this.setState({ searchQuery: query});
    }

    handleProceed = () => {
        const { drugs } = this.state;
        var selectedDrugs = [];
        var nameofDrugs = [];
        drugs.forEach(drug =>  {
            if (drug.quantity > 0) {
                const wanted = {drug: drug._id, quantity: drug.quantity};
                nameofDrugs = [...nameofDrugs, drug.name];
                selectedDrugs = [...selectedDrugs, wanted];
            }
        });

        this.props.history.push('/confirmdiagnosis', 
        { stuff:this.props.location.state.stuff,
          patient: this.props.location.state.patient,
          diagnosis: this.props.location.state.diagnosis,
          selectedDrugs: selectedDrugs,
          nameofDrugs });
    }

    getData = () => {
        const { searchQuery, drugs } = this.state;
    
        let filtered = drugs;
        if (this.state.searchQuery)
          filtered = drugs.filter(m => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
          return filtered;
    }

    render() {
        const { loading, drugs, searchQuery } = this.state;
        return (
            <React.Fragment>
                {loading ? <div className="loading">Loading</div> : null}
                {drugs ?
                    <div className="container">
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                        <SelectDrugTable drugs={this.getData()} onAdd={this.handleAddDrug} onSub={this.handleSubDrug} />
                        <div className="float-right">
                        <button type="button" className="btn btn-outline-primary" onClick={this.handleProceed}>Proceed</button>
                        </div>
                    </div> : null}
            </React.Fragment>
        );
    }
}

export default SelectDrug;