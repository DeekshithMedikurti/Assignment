import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';
import AutocompleteSearch from './AutocompleteSearch';

export class EmployeeGrid extends Component {

    constructor() {
        super()
        this.state = { rowUpdated: false, docID: '', rowDeleted: false, editedID: '', editedName: '', editedEmail: '', editedPhone: '', editedLocation: '', editedJoiningDate: '', editedLastDate: '', rowBeingEdited: '', clickedEdit: false, loading: false, employees: [] }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('http://localhost:5000/employee-details').then(data => data.data)
            .then((response) => {
                this.setState({ loading: false, employees: response })
            })
    }

    componentDidUpdate() {
        if (this.state.rowUpdated || this.state.rowDeleted) {
            axios.get('http://localhost:5000/employee-details').then(data => data.data)
                .then((response) => {
                    this.setState({ employees: response })
                })
        }
    }

    cancelClick = () => {
        this.setState({ clickedEdit: false })
    }

    onEditClick = (emp) => {
        this.setState({ docId: emp._id, clickedEdit: true, rowBeingEdited: emp.id, editedID: emp.id, editedName: emp.name, editedEmail: emp.email, editedPhone: emp.phone, editedLocation: emp.location, editedJoiningDate: emp.joiningDate, editedLastDate: emp.lastDate })
    }

    deleteRow = (id) => {
        const dt = { data: { value: id } };
        axios.post('http://localhost:5000/delete/employee', dt).then((res) => {
            if (res.status === 200) {
                this.setState({ rowDeleted: true, rowUpdated: false })
            }
        })
    }

    onSaveClick = () => {
        const dt = { data: { _id: this.state.docId, id: this.state.editedID, name: this.state.editedName, email: this.state.editedEmail, phone: this.state.editedPhone, location: this.state.editedLocation, joiningDate: this.state.editedJoiningDate, lastDate: this.state.editedLastDate } }
        axios.post('http://localhost:5000/update/employee', dt).then((res) => {
            if (res.status === 200) {
                this.setState({ rowDeleted: false, clickedEdit: false, rowUpdated: true, editedID: '', editedName: '', editedEmail: '', editedPhone: '', editedLocation: '', editedJoiningDate: '', editedLastDate: '' })
            }
        })
    }

    handleID = (e) => {
        this.setState({ editedID: e.target.value })
    }

    handleInputName = (e) => {
        this.setState({ editedName: e.target.value })
    }

    handleInputEmail = (e) => {
        this.setState({ editedEmail: e.target.value })
    }

    handleInputPhone = (e) => {
        this.setState({ editedPhone: e.target.value })
    }

    handleInputLocation = (e) => {
        this.setState({ editedLocation: e.target.value })
    }

    handleInputJoiningDate = (e) => {
        this.setState({ editedJoiningDate: e.target.value })
    }

    handleInputLastDate = (e) => {
        this.setState({ editedLastDate: e.target.value })
    }

    sortByLast = () => {
        this.setState({ sorting: true, employees: this.state.employees.sort(this.custom_sort_by_last) })
    }

    sortByJoining = () => {
        this.setState({ sorting: true, employees: this.state.employees.sort(this.custom_sort_by_join) })
    }

    custom_sort_by_join = (a, b) => {
        return new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
    }

    custom_sort_by_last = (a, b) => {
        return new Date(a.lastDate).getTime() - new Date(b.lastDate).getTime();
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{ position: 'absolute', top: '0px', left: '0px', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', zIndex: 999, opacity: 0.6, backgroundColor: 'white', overflowY: 'scroll' }}>
                    <h4>Please wait while we load the data...</h4><br /><Spinner animation="border" variant="primary" />
                </div>
            )
        } else {
            var names = []
            var emails = []
            this.state.employees.forEach(element => {
                names.push(element.name)
                emails.push(element.email)
            });
            return (
                <div>
                    <div className="mt-5 mx-auto text-center"><h2 style={{ color:'red', fontFamily: 'Comic Sans MS' }}>Employees</h2></div><br /><br />
                    <AutocompleteSearch objs={this.state.employees} plc='Search By Name' sent='names' emps={names}></AutocompleteSearch><br />
                    <AutocompleteSearch objs={this.state.employees} plc='Search By Email' sent='emails' emps={emails}></AutocompleteSearch>
                    <div style={{ height: '50%', overflowY: 'auto' }}>
                        <table style={{ borderStyle: 'solid', width: '80%' }} align="center" className="mt-5 table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Joining Date</th>
                                    <th scope="col">Last Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.map((emp) => {
                                    return (
                                        <tr key={emp.id}>
                                            {this.state.clickedEdit && this.state.rowBeingEdited === emp.id ?
                                                <>
                                                    <td><input type="text" value={this.state.editedID} onChange={e => this.handleID(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedName} onChange={e => this.handleInputName(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedEmail} onChange={e => this.handleInputEmail(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedPhone} onChange={e => this.handleInputPhone(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedLocation} onChange={e => this.handleInputLocation(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedJoiningDate} onChange={e => this.handleInputJoiningDate(e)}></input></td>
                                                    <td><input type="text" value={this.state.editedLastDate} onChange={e => this.handleInputLastDate(e)}></input></td>
                                                    <td>
                                                        <div><span className="btn_save"><button type="button" className="btn btn-success btn-sm" onClick={e => this.onSaveClick()} >
                                                            Save
                                            </button></span><br />
                                                            <span className="btn_cancel"><button type="button" className="btn btn-danger btn-sm" onClick={e => this.cancelClick()}>
                                                                Cancel
                                            </button></span></div>
                                                    </td>
                                                </> :
                                                <>
                                                    <td><div col_name="id">{emp.id}</div></td>
                                                    <td><div col_name="name">{emp.name}</div></td>
                                                    <td><div col_name="email">{emp.email}</div></td>
                                                    <td><div col_name="phone">{emp.phone}</div></td>
                                                    <td><div col_name="location">{emp.location}</div></td>
                                                    <td><div col_name="joiningDate">{emp.joiningDate}</div></td>
                                                    <td><div col_name="lastDate">{emp.lastDate}</div></td>
                                                    <td><div><span className="btn_edit"><button type="button" className="btn btn-primary btn-sm" onClick={e => this.onEditClick(emp)}>
                                                        Edit
                                            </button></span><br />
                                                        <span className="btn_edit"><button type="button" className="btn btn-danger btn-sm" onClick={e => this.deleteRow(emp._id)}>
                                                            Delete
                                            </button></span></div></td>
                                                </>
                                            }
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                    {this.state.rowDeleted ? <div style={{ marginLeft: '40px', display: 'inline-block' }} className="text-center ml-5 alert alert-success" role="alert">
                        Employee has been deleted from the database!
                    </div> : null}
                    {this.state.rowUpdated ? <div style={{ marginLeft: '40px', display: 'inline-block' }} className="text-center ml-5 alert alert-success" role="alert">
                        Data has been updated to the database!
                </div> : null}<br /><br />
                    <div className="text-center">
                        <button type="button" className="btn btn-danger" onClick={e => this.sortByLast()}>Sort by Last Date</button>
                        <button style={{ marginLeft: '20px' }} type="button" className="btn btn-success" onClick={e => this.sortByJoining()}>Sort by Joining Date</button>
                    </div><br /><br />
                </div>
            )
        }
    }
}

export default EmployeeGrid
