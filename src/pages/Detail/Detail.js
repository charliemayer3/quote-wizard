import React, { Component } from "react";
import "./Detail.css";
import leads from '../../auto.leads.json';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leads: leads,
      currentLead: [],
      names: [],
      values: []
    };
  };

  // Search the leads JSON for a matching ID, set it in state
  getCurrentLead = () => {
    for (let i = 0; i < this.state.leads.length; i++) {
      if (parseInt(this.state.leads[i].id) === parseInt(this.props.id)) {
        this.state.currentLead.push(this.state.leads[i])
      }
    }
  };

  // Converts the whole current lead into arrays in the state so that they are easier to render
  parseLead = () => {
    let consumerValue;
    for (const consumerName in this.state.currentLead[0].consumer) {
      consumerValue = this.state.currentLead[0].consumer[consumerName]
      this.state.names.push(consumerName);
      this.state.values.push(consumerValue);
    }
    let coverageValue;
    for (const coverageName in this.state.currentLead[0].coverage) {
      coverageValue = this.state.currentLead[0].coverage[coverageName]
      this.state.names.push(coverageName);
      this.state.values.push(coverageValue);
    }
    for (var v = 0; v < this.state.currentLead[0].vehicle.length; v++) {
      let vehicleValue;
      for (const vehicleName in this.state.currentLead[0].vehicle[v]) {
        vehicleValue = this.state.currentLead[0].vehicle[v][vehicleName]
        this.state.names.push(vehicleName);
        this.state.values.push(vehicleValue);
      }
    }
  };

  // Render each key value pair from the two state arrays onto the page
  renderLead = (index) => {
    return `${this.state.names[index]}: ${this.state.values[index]}`
  }

  render() {
    this.getCurrentLead()
    this.parseLead()
    return (
      <div style={{ textAlign: 'left', marginLeft: '10%' }}>
        <h2>Quote ID: {this.state.currentLead[0].id}</h2>
        {this.state.names.map((name, index) => (
          <p key={name}>{this.renderLead(index)}</p>
        ))}
      </div>
    );
  }
}

export default Detail;