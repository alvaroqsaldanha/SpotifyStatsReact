/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Signedin from './Signedin'; 
import Signedout from './Signedout'; 

class App extends Component {

    constructor() { 
        super();
        this.state = {
          userloggedin: false,
          access_token: ''
        }
    } 

    render() { 
      const {userloggedin} = this.state;
      return userloggedin ? <Signedin /> : <Signedout />; 
    }
} 

export default App;