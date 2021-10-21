import React, { Component } from 'react'; 
import './Signedin.css';
import Aotd from './Aotd';

class Signedin extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            timeframe: '',
            access_token: this.props.token,
            aotd: false
        }
    } 

    changeTimeframe = (event) => {
        this.setState({timeframe: event.target.value});
    } 

    changeAotd = (test) => {
        this.setState({aotd: test});
    }

    render() { 
        return this.state.aotd ? <Aotd token={this.state.access_token} closefunction={this.changeAotd} /> : (<div>
            <footer>
                <select className="dropdown" name="timeframes" onChange={this.changeTimeframe}>
                    <option value="4 weeks">4 weeks</option>
                    <option value="6 months">6 months</option>
                    <option value="Years">Years</option>
                </select> 
                <button className="aotdbutton" onClick={() => this.changeAotd(true)}>Get Random Song!</button>
                <button className="signoutbutton" onClick={this.props.signoutfunction}>SIGN OUT</button>
            </footer>
          </div>);
    }
} 

export default Signedin; 
