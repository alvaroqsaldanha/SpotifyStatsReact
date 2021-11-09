import React, { Component } from 'react'; 

class SignedOutErrorBoundary extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            hasError: false
        }
    } 

    componentDidCatch(error, info) { 
        console.log(error);
        this.setState({hasError: true});
    }

    render() { 
     if (this.state.hasError) {
         return (<div>
             {this.props.children}
             <h2 className="welcomeText" style={{marginTop: '16%'}}>CAN'T CONNECT TO SPOTIFY... PLEASE TRY AGAIN</h2>
         </div>)
     }
      return (this.props.children);
    }
} 

export default SignedOutErrorBoundary;