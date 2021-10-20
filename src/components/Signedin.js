import React, { Component } from 'react'; 
import './Signedin.css';

class Signedin extends Component {

    constructor() { 
        super();
        this.state = {
            timeframe: ''
        }
    } 

    changeTimeframe = (event) => {
        this.setState({timeframe: event.target.value});
    }

    render() { 
        return (<div>
            <h1 className="maintext">Your Spotify Statistics</h1>
            <footer>
                <select className="dropdown" name="timeframes" onChange={this.changeTimeframe}>
                    <option value="4 weeks">4 weeks</option>
                    <option value="6 months">6 months</option>
                    <option value="Years">Years</option>
                </select>
                <button className="signoutbutton" onClick={this.props.signoutfunction}>SIGN OUT</button>
            </footer>
          </div>);
    }
} 

export default Signedin; 
