/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Signedin from './../components/Signedin'; 
import Signedout from './Signedout'; 

class App extends Component {

    constructor() { 
        super();
        this.state = {
          userloggedin: false,
          access_token: ''
        }
    } 

    onSucessfullSignIn = (token)  => {
      this.setState({ userloggedin: true, access_token: token });
    } 

    signOut = (token)  => {
      this.setState({ userloggedin: false, access_token: '' });
    } 


    render() { 
      const {userloggedin} = this.state;
      return userloggedin ? <Signedin signoutfunction={this.signOut} /> : <Signedout signinfunction={this.onSucessfullSignIn} />; 
    }
} 

export default App;