/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Signedin from './Signedin'; 
import Signedout from './Signedout'; 
import SignedOutErrorBoundary from './SignedOutErrorBoundary'

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
      const {userloggedin,access_token} = this.state;
      return userloggedin ? <Signedin signoutfunction={this.signOut} token={access_token} /> : 
      <SignedOutErrorBoundary>
        <Signedout signinfunction={this.onSucessfullSignIn} />; 
      </SignedOutErrorBoundary>
    }
}  

export default App;