import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

export class EmployeeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, errorPosting: '', locationError: '', fieldNull: '', emailError: '', nameError: '', phoneError: '', idError: '', errors: '', isDisable: false, name: '', id: '', phone: '', location: "", email: '', dataPosted: false, joiningDate: new Date(), lastDate: new Date() }
    }

    validate = () => {
        var date1 = new Date(this.state.joiningDate)
        var date2 = new Date(this.state.lastDate)
        var today = new Date()
        let re = /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/
        let phonere = /^\d{10}$/
        let idre = /[\d+]/
        let emailre = /^(.+)@(.+)$/
        if (!this.state.email.includes('.com') || this.state.email.length === 0 || !this.state.email.match(emailre)) {
            this.setState({ emailError: 'Please enter a valid email' })
        }
        if (!this.state.name.match(re) || this.state.name.length === 0) {
            this.setState({ nameError: 'Invalid Name' })
        }
        if (!this.state.phone.match(phonere) || this.state.phone.length === 0) {
            this.setState({ phoneError: 'Invalid Phone' })
        }
        if (!this.state.id.match(idre) || this.state.id.length === 0) {
            this.setState({ idError: 'Invalid ID' })
        }
        if (date1 === date2 || date1 > date2) {
            this.setState({ errors: 'your joining date cannot be later than your last date' })
        }
        if (date2 > today) {
            this.setState({ errors: 'your last date cannot be past the current date' })
        }
        if (this.state.location.length === 0) {
            this.setState({ locationError: 'location cannot be empty' })
        }
    }

    handleUpload = () => {
        this.validate()
        if (this.state.fieldNull || this.state.emailError || this.state.phoneError || this.state.idError || this.state.locationError || this.state.errors || this.state.nameError) {
            this.setState({ isDisable: true })
        }
        else {
            this.setState({ loading: true })
            console.log('coming here')
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('id', this.state.id);
            formData.append('email', this.state.email);
            formData.append('phone', this.state.phone);
            formData.append('location', this.state.location);
            formData.append('joiningDate', this.state.joiningDate.toISOString());
            formData.append('lastDate', this.state.lastDate.toISOString().substr(0,10));
            axios.post('http://localhost:5000/enroll/employee', JSON.stringify(Object.fromEntries(formData)), { headers: { 'Content-Type': 'application/json' } }).then(res => {
                if (res) {
                    this.setState({ loading: false })
                    this.setState({ dataPosted: true })
                } else {
                    this.setState({ errorPosting: res.error })
                }
            });
        }
    }

    handlePhone = e => {
        this.setState({
            phone: e.target.value
        })
    }

    handleChangeInLocation = e => {
        this.setState({
            location: e.target.value
        })
    }

    handleName = e => {
        this.setState({
            name: e.target.value
        });
    };

    handleChange = date => {
        this.setState({
            joiningDate: date
        });
    };

    handleChangeInLast = date => {
        this.setState({
            lastDate: date
        });
    };

    handleID = e => {
        this.setState({
            id: e.target.value
        });
    };

    handleEmail = e => {
        this.setState({
            email: e.target.value
        });
    }

    render() {
        if (!this.state.dataPosted) {
            return (
                <div className="ml-5 mt-5">
                    {this.state.errorPosting ? <div className="alert alert-danger" role="alert">
                        {this.state.errorPosting}
                    </div> : null}
                    <div className="text-center">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="form-group">
                        <label >Employee Name:</label>
                        <input style={inputStyle} type="email" className="form-control" aria-describedby="name" placeholder="Enter your full name" onChange={e => this.handleName(e)} />
                        {this.state.nameError ? <div><small style={{ color: 'red' }}>{this.state.nameError}</small><br /></div> : null}
                    </div>
                    <div className="form-group">
                        <label>Employee ID:</label>
                        <input style={inputStyle} type="email" className="form-control" aria-describedby="empid" placeholder="Enter your employee id" onChange={e => this.handleID(e)} />
                        {this.state.idError ? <div><small style={{ color: 'red' }}>{this.state.idError}</small><br /></div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input style={inputStyle} type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => this.handleEmail(e)} />
                        {this.state.emailError ? <div><small style={{ color: 'red' }}>{this.state.emailError}</small><br /></div> : null}
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input style={inputStyle} type="tel" className="form-control" placeholder="Enter your phone number" onChange={e => this.handlePhone(e)} />
                        {this.state.phoneError ? <div><small style={{ color: 'red' }}>{this.state.phoneError}</small><br /></div> : null}
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input style={inputStyle} type="text" className="form-control" placeholder="Enter your location" onChange={e => this.handleChangeInLocation} />

                    </div>
                    <label>Joining Date:</label><br /><DatePicker selected={this.state.joiningDate} onChange={this.handleChange} /><br />
                    <label>Last Date:</label><br /><DatePicker selected={this.state.lastDate} onChange={this.handleChangeInLast} /><br />
                    <br />
                    {this.state.errors ? <div><small style={{ color: 'red' }}>{this.state.errors}</small><br /></div> : null}
                    {this.state.fieldNull ? <div><small style={{ color: 'red' }}>{this.state.fieldNull}</small><br /></div> : null}
                    <button type="submit" className="btn btn-primary" disabled={this.state.isDisable} onClick={this.handleUpload}>Submit</button>
                    {this.state.loading ? <div style={{ position: 'absolute', top: '0px', left: '0px', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 999, opacity: 0.6, backgroundColor: 'white', overflowY: 'scroll' }}>
                        <Spinner animation="border" variant="primary" />
                    </div> : null}
                    { this.state.loading ? window.scrollTo(0, 0) : null }
                </div>
            )
        }
        else {
            return (
                <div className="alert alert-success" role="alert">
                    Data has been posted to the database!
                </div>
            )
        }
    }
}

const inputStyle = {
    width: '50%'
}

export default EmployeeInfo
