import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

class Login extends Component {
    state = { email: '', password: '', loading: false }

    handleOnChange = ({ target }) => {
        if (target.id === 'email') {
            this.setState({ email: target.value })
            return;
        }
        if (target.id === 'password') {
            this.setState({ password: target.value });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({loading: true});
        axios.post('http://localhost:4000/api/staff/staffLogin', { email, password })
            .then(res => {
                this.setState({loading: false});
                if (res.data.auth) {
                    if (res.data.stuff.role.name.toLowerCase() === 'Doctor'.toLowerCase()) {
                        this.props.history.replace('/searchpatient', {stuff: res.data.stuff});
                    } else if(res.data.stuff.role.name.toLowerCase() === 'Pharmacist'.toLowerCase()) {
                        this.props.history.replace('/patientpharm', {stuff: res.data.stuff});
                    }
                  
                }
            }).catch(err => {
                this.setState({loading: false});
                toast.error('Authentication was not successsful');
            });
    }

    render() {
        const { email, password, loading } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                {loading ? <div className="loading">Loading&#8230;</div> : null}
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup >
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                id="email"
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => this.handleOnChange(e)}
                            />
                        </FormGroup>
                        <FormGroup >
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                id="password"
                                value={password}
                                onChange={e => this.handleOnChange(e)}
                                type="password"
                            />
                        </FormGroup>
                        <Button block disabled={!(email.length > 0 && password.length > 0)} type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </React.Fragment>

        );
    }
}

export default Login;