import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import leads from '../../auto.leads.json';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leads: leads,
      displayedLeads: [],
      start: 0,
      stop: 5
    }
  }

  // Load the entire auto.leads.json file into a stored state
  loadLeads = () => {
    for (let i = this.state.start; i < (this.state.stop); i++) {
      if (this.state.leads[i]) {
        this.state.displayedLeads.push(this.state.leads[i])
      };
    };
  };

  // Updates the list of quotes currently showing.  Checks to make sure start and stop states don't go further than the indexes of the first and last members of the array
  updateQuotes = (symbol) => {
    const remainder = this.state.stop % 5;
    this.setState({ displayedLeads: [] });
    if (!symbol && (this.state.start > 0)) {
      this.setState({ start: this.state.start -= 5, stop: (remainder) ? this.state.stop - remainder : this.state.stop -= 5 })
    } else if (symbol && ((this.state.start + 5) < this.state.leads.length)) {
      this.setState({ start: this.state.start += 5, stop: (this.state.stop + 5 > this.state.leads.length) ? this.state.leads.length : this.state.stop += 5 })
    };
  };

  // Filter function to work when you click any of the buttons to sort the data
  filter = (search) => {
    this.setState({ displayedLeads: [], start: 0, stop: 5 });
    const sortLeads = this.state.leads;
    sortLeads.sort(function(a, b){
      const first = eval(`a.${search}`);
      const second = eval(`b.${search}`);
      var x = first.toLowerCase();
      var y = second.toLowerCase();
      if (x < y) {return -1;};
      if (x > y) {return 1;};
      return 0;
    });
    this.setState({ leads: sortLeads })
  };

  render() {
    this.loadLeads()
    return (
      <div style={{ textAlign: 'left', marginLeft: '10%'}}>
        <h2>Quote Wizard Test</h2>
        <ul>
          {this.state.displayedLeads.map(lead => (
            <div key={lead.id}>
              <span><strong>Lead ID: {lead.id}</strong></span><br/>
              <span>Consumer State: {lead.consumer.state}  /  </span>
              <span>Vehicle Make: {lead.vehicle[0].make}  /  </span>
              <span>Former Insurer: {lead.coverage.former_insurer}</span><br/>
              <button>
                <Link to={"/quoteDetail/" + lead.id}>Details</Link>
              </button><br/><br/>
            </div>
          ))}
        </ul>
        <a onClick={() => this.updateQuotes(false)} className="previous round">&#8249;</a>
        <a onClick={() => this.updateQuotes(true)} className="next round">&#8250;</a>
        <span>   Displaying {this.state.start + 1}-{this.state.stop} of {this.state.leads.length} results</span><br/><br/>
        <span>Click below to sort by:</span><br/>
        <button onClick={() => this.filter('consumer.state')}>Consumer State</button>
        <button onClick={() => this.filter('vehicle[0].make')}>Vehicle Make</button>
        <button onClick={() => this.filter('coverage.former_insurer')}>Former Ins</button>
      </div>
    );
  }
}

export default Home;