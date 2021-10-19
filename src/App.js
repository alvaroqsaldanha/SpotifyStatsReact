import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() { 
        super();
        this.state = {
            userloggedin: false
        }
    } 

    render() { 
      return (<div>
        <h1 className="maintext">Your Spotify Statistics</h1>
        <h2 className="welcomeText">WELCOME</h2>
    
        <div className="signin"><button class="signinbutton">SIGN IN</button></div>
      </div>);
    }
} 

export default App;