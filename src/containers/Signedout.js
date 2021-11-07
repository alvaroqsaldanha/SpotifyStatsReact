/*global chrome*/
import React, { Component } from 'react'; 
import { error_map } from './States';

class Signedout extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            error: false,
            message: ""
        }
    } 

    authorize = (temp_state) => {
        const CLIENT_ID = 'ccd5e2b799eb4d0c9daf57324aa666ba';
        const RESPONSE_TYPE = encodeURIComponent('token');
        //const REDIRECT_URI = encodeURIComponent('https://aonceapadahkknamgbchadpdedobgnfg.chromiumapp.org/');
        const REDIRECT_URI = encodeURIComponent('https://mkcilobclflkbcpmgmjbnkipkkhhiigj.chromiumapp.org/');
        const SCOPE = encodeURIComponent('user-read-email user-top-read streaming');
        const SHOW_DIALOG = encodeURIComponent('true');
        let ouathurl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${temp_state}&show_dialog=${SHOW_DIALOG}`;
        return ouathurl;
    }
    

    signIn = () => {
        const temp_state = 'csh' + (Math.random() * (998999999) + 1000000).toString().substring(3,9) + 'ff' + Math.random().toString(36).substring(2, 16); 
        chrome.identity.launchWebAuthFlow({
            url: this.authorize(temp_state),
            interactive: true 
        }, function(redirect_url) {
            if (chrome.runtime.lastError) {
                console.log("There was a runtime error: ", chrome.runtime.lastError);
                this.setState({
                    error: true,
                    message: error_map['RUNTIME_ERROR']
                });
            } 
            else {
                if (redirect_url.includes('callback?error=access_denied')){
                    console.log("Access denied");
                    this.setState({
                        error: true,
                        message: error_map['ACCESS_DENIED']
                    });
                }
                else{
                    let stateToken = redirect_url.substring(redirect_url.indexOf('state') + 6);
                    if (stateToken === temp_state){

                        setTimeout(() => { 
                            //REFRESH TOKEN, currently token is refreshed everytime the window is closed.
                        }, 3600000);
                        
                        let ACCESS_TOKEN = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
                        ACCESS_TOKEN = ACCESS_TOKEN.substring(0,ACCESS_TOKEN.indexOf('&'));
                        this.props.signinfunction(ACCESS_TOKEN);
                    }
                    else{
                        this.setState({
                            error: true,
                            message: error_map['DIFFERENT_STATE']
                        });
                    }  
                } 
            }
        }.bind(this));
        return true;
    }

    render() { 
      const {error , message} = this.state;
      this.signIn = this.signIn.bind(this);
      if (error) {
        // Return error component 
      }
      return (<div>
        <h2 className="welcomeText">WELCOME</h2>
        <div className="signin"><button className="signinbutton button1" onClick={this.signIn}>SIGN IN</button></div>
      </div>);
    }
} 

export default Signedout;