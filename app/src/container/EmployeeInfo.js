import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

export class EmployeeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, errorPosting: '', locationError: '', fieldNull: '', emailError: '', nameError: '', phoneError: '', idError: '', errors: '', isDisable: true, name: '', id: '', phone: '', location: "", email: '', dataPosted: false, joiningDate: new Date(), lastDate: new Date() }
    }


    handleUpload = () => {
        this.setState({ loading: true })
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('id', this.state.id);
        formData.append('email', this.state.email);
        formData.append('phone', this.state.phone);
        formData.append('location', this.state.location);
        formData.append('joiningDate', this.state.joiningDate.toISOString().substr(0, 10));
        formData.append('lastDate', this.state.lastDate.toISOString().substr(0, 10));
        axios.post('http://localhost:5000/enroll/employee', JSON.stringify(Object.fromEntries(formData)), { headers: { 'Content-Type': 'application/json' } }).then(res => {
            if (res) {
                this.setState({ loading: false, dataPosted: true })
            } else {
                this.setState({ errorPosting: res.error })
            }
        });
    }

    handlePhone = e => {
        var value = e.target.value
        let phonere = /^\d{10}$/
        if(!value.match(phonere) || value.length < 10 || value.length > 10 ){
            this.setState({ phoneError: 'Invalid Phone'})
        }else{
            this.setState({
                phone: value, phoneError: ''
            })
        }
    }

    handleChangeInLocation = e => {
        var value = e.target.value
        if(value.length === 0){
            this.setState({ locationError: 'Invalid Location' })
        }else{
            this.setState({
                location: value, locationError: ''
            })
        }
    }

    handleName = e => {
        let re = /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/
        var value = e.target.value
        if(!value.match(re) || value.length === 0){
            this.setState({ nameError: 'Invalid Name'})
        }else{
            this.setState({
                name: value, nameError: ''
            });
        }
    };

    validate = () => {
        if(this.state.joiningDate.toISOString().substr(0, 10) === this.state.lastDate.toISOString().substr(0, 10)){
            this.setState( { errors: 'your joining date cannot be your last date' })
        }else{
            this.setState({ isDisable: false })
        }
    }

    handleChange = date => {
        this.setState({
            joiningDate: date
        });
    };

    handleChangeInLast = date => {
        this.validate()
        this.setState({
            lastDate: date
        });
    };

    handleID = e => {
        var value = e.target.value
        let idre = /^\d+$/
        if (!value.match(idre) || value.length === 0) {
            this.setState({ idError: 'Invalid ID' })
        }else{
            this.setState({
                id: value, idError: ''
            });
        }
    };

    handleEmail = e => {
        var value = e.target.value
        if (!value.includes('.com') || value.length === 0 ) {
            this.setState({ emailError: 'Please enter a valid email' })
        }else{
            this.setState({
                email: value, emailError: ''
            });
        }
    }

    render() {
        if (!this.state.dataPosted) {
            return (
                <div className="ml-5 mt-5">
                    {this.state.errorPosting ? <div className="alert alert-danger" role="alert">
                        {this.state.errorPosting}
                    </div> : null}
                    <div className="text-center">
                        <h3 style={{ color: 'blue', fontFamily: 'Comic Sans MS' }}>Employee Details</h3>
                    </div>
                    <div>
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
                            <input style={inputStyle} type="text" className="form-control" placeholder="Enter your location" onChange={e => this.handleChangeInLocation(e)} />

                        </div>
                        <label>Joining Date:</label><br /><DatePicker selected={this.state.joiningDate} onChange={this.handleChange} /><br />
                        <label>Last Date:</label><br /><DatePicker selected={this.state.lastDate} onChange={this.handleChangeInLast} /><br />
                        <br />
                    </div>
                    {this.state.errors ? <div><small style={{ color: 'red' }}>{this.state.errors}</small><br /></div> : null}
                    {this.state.fieldNull ? <div><small style={{ color: 'red' }}>{this.state.fieldNull}</small><br /></div> : null}
                    <button type="submit" className="btn btn-primary" disabled={this.state.isDisable} onClick={this.handleUpload}>Submit</button>
                    {this.state.loading ? <div style={{ position: 'absolute', top: '0px', left: '0px', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 999, opacity: 0.6, backgroundColor: 'white', overflowY: 'scroll' }}>
                        <Spinner animation="border" variant="primary" />
                    </div> : null}
                    {this.state.loading ? window.scrollTo(0, 0) : null}
                </div>
            )
        }
        else {
            return (
                <div style={{ marginLeft: '40px', display: 'inline-block' }} className="alert alert-success" role="alert">
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
