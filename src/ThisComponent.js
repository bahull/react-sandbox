import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import './ThisComponent.css';

class ThisComponent extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:3001',
      entry: 0,
      messages: [],
      newMessage: ''
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient('http://localhost:3001');
    socket.on('FromAPI', data => this.setState({ messages: data }));
  }

  changeEntry = function(e) {
    console.log(e.target.value);
    this.setState({ entry: e.target.value });
  };
  noChange = function(e) {
    e.preventDefault();
    this.props.valueChanger(this.state.entry);
  };

  addMessage = function(e) {
    this.setState({ newMessage: e.target.value });
  };
  newChange = function(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3001/api/newMessages', {
        messages: this.state.newMessage
      })
      .then(response => console.log(response));
  };
  render() {
    return (
      <div>
        <h1>Add your number with our number 5</h1>
        <form onSubmit={e => this.noChange(e)}>
          <input type="text" onChange={e => this.changeEntry(e)} />
          <button onSubmit={() => this.props.valueChanger(this.state.entry)} />
        </form>
        <h2>This is a number guessing game, that we are going to style!</h2>
        <ul>
          <li>Test </li>
          <li>3</li>
          <li>2</li>
        </ul>
        <form onSubmit={e => this.newChange(e)}>
          <input type="text" onChange={e => this.addMessage(e)} />
        </form>
        <hr />
        <hr />
        Your Messages:
        {this.state.messages &&
          this.state.messages.map((curr, index) => {
            return (
              <div key={index}>
                <h3>{curr}</h3>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ThisComponent;
