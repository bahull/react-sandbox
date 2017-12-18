import React, { Component } from 'react';
import logo from './logo.svg';

import ThisComponent from './ThisComponent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 5
    };
    this.handleValue = this.handleValue.bind(this);
  }

  handleValue = function(value) {
    // value.preventDefault();
    let newState = parseInt(this.state.total) + parseInt(value);
    this.setState({ total: newState });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Hey Gabby!</h1>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ThisComponent valueChanger={this.handleValue} />

        <h3>Your number is : {this.state.total}</h3>
      </div>
    );
  }
}

export default App;
