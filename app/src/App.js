import React, { Component } from 'react'
import EmployeeGrid from './container/EmployeeGrid'
import EmployeeInfo from './container/EmployeeInfo'

export class App extends Component {

  constructor(){
    super()
    this.state = { clickedAdd : false, clickedDisplay: false }
  }

  onAdd = () => {
    this.setState({ clickedAdd: true, clickedDisplay: false })
  }

  onDisplay = () => {
    this.setState({ clickedDisplay: true,  clickedAdd: false })
  }

  render() {
    return (
      <div className="mt-5">
        <div className="text-center mt-5"><h2 style={{ fontFamily: 'Comic Sans MS'}}>Employee Admin Portal</h2></div>
        <div className="mt-5 text-center">
          <button type="button" className="btn btn-primary" onClick={ e => { this.onAdd() } }>Add Employee</button>
          <button style={{ marginLeft: '50px' }} type="button" className="btn btn-danger" onClick={ e => { this.onDisplay() } }>Display Info</button>
        </div>
        {
          this.state.clickedAdd ? <EmployeeInfo /> : null
        }
        {
          this.state.clickedDisplay ? <EmployeeGrid /> : null
        }
      </div>
    )
  }
}

export default App