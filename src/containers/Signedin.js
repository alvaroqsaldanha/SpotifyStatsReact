import React, { Component } from 'react'; 
import './Signedin.css';
import Aotd from './Aotd';
import TopItems from './TopItems';

class Signedin extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            timeframe: 'short_term',
            access_token: this.props.token,
            aotd: false,
            topsongs: {},
            topartists: {}
        } 

    } 

    changeTimeframe = (event) => {
        this.setState({timeframe: event.target.value});
    } 

    changeAotd = (test) => {
        this.setState({aotd: test});
    } 

    render() { 
        console.log(this.state.timeframe);
        return this.state.aotd ? <Aotd token={this.state.access_token} closefunction={this.changeAotd} /> : (<div>
            <TopItems token={this.state.access_token} timeframe={this.state.timeframe}/>
            <footer>
                <select className="dropdown" name="timeframes" onChange={this.changeTimeframe}>
                    <option value="short_term">4 weeks</option>
                    <option value="medium_term">6 months</option>
                    <option value="long_term">Years</option>
                </select> 
                <button className="aotdbutton" onClick={() => this.changeAotd(true)}>Get Random Song!</button>
                <button className="signoutbutton" onClick={this.props.signoutfunction}>SIGN OUT</button>
            </footer>
          </div>);
    }
} 

export default Signedin; 
