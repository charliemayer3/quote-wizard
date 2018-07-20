import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/';
import Detail from './pages/Detail/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render(props) {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home/>} />
            <Route exact path="/quoteDetail/:id" render={(props) => <Detail id={props.match.params.id}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
