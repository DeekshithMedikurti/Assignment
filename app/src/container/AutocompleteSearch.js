import React, { Component } from 'react'
import './Autocomplete.css'
export class AutocompleteSearch extends Component {

    constructor(props) {
        super(props)
        this.state = { nameSelected: false, text: '', suggestions: [] }
    }

    onTextChange = (e) => {
        const value = e.target.value
        let suggestions = []
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.props.emps.sort().filter(v => regex.test(v))
        }
        console.log(suggestions)
        this.setState({ suggestions: suggestions, text: value })
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if (suggestions.length === 0) { return null }
        return (
            <ul>
                {suggestions.map((item, index) => (
                    <li key={index} onClick={e => this.suggestionSelected(item)} > {item} </li>
                ))}
            </ul>
        )
    }

    suggestionSelected = (value) => {
        this.setState({ nameSelected: true, text: value, suggestions: [] })
    }

    displayInfo = () => {
        var obj = {}
        this.props.objs.forEach(element => {
            if (this.props.sent === 'names') {
                if (this.state.text.trim() === element.name) {
                    obj = element;
                }
            } else {
                if (this.state.text.trim() === element.email) {
                    console.log('text and email: ', this.state.text, element.email)
                    obj = element;
                }
            }
        });
        if (obj) {
            return (
                <><br /><div className="text-center">
                    <p>Name: {obj.name}</p>
                    <p>Email: {obj.email}</p>
                    <p>ID: {obj.id}</p>
                    <p>Phone: {obj.phone}</p>
                    <p>Location: {obj.location}</p>
                    <p>Joining Date: {obj.joiningDate}</p>
                    <p>Last Date: {obj.lastDate}</p>
                </div>
                </>
            )
        }
    }

    render() {
        return (
            <>
                <div className="mx-auto AutoCompleteText">
                    <input placeholder={this.props.plc} value={this.state.text} onChange={e => this.onTextChange(e)} type="text"></input>
                    {this.renderSuggestions()}
                </div>
                {
                    this.state.nameSelected ? this.displayInfo() : null
                }
            </>
        )
    }
}

export default AutocompleteSearch
