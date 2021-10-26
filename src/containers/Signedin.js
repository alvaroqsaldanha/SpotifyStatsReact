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
            ids: {}
        } 
    } 

    changeTimeframe = (event) => {
        this.setState({timeframe: event.target.value});
    } 

    changeAotd = (active) => {
        this.setState({aotd: active});
    } 

    changeIds = (current) => {
        this.setState({ids: current});
    }

    render() { 
        return this.state.aotd ? <Aotd token={this.state.access_token} closefunction={this.changeAotd} ids={this.state.ids} /> : (<div>
            <TopItems token={this.state.access_token} timeframe={this.state.timeframe} getIds={this.changeIds}/>
            <footer>
                <select className="dropdown dropdowntf" name="timeframes" onChange={this.changeTimeframe}>
                    <option value="short_term">4 weeks</option>
                    <option value="medium_term">6 months</option>
                    <option value="long_term">Years</option>
                </select> 
                <button className="aotdbutton button1" onClick={() => this.changeAotd(true)}>Get Random Song!</button>
                <button className="signoutbutton button1" onClick={this.props.signoutfunction}>SIGN OUT</button>
            </footer>
          </div>);
    }
} 

export default Signedin; 
