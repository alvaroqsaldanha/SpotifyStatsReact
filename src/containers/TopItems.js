import React, { Component } from 'react'; 

class TopItems extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            timeframe: this.props.timeframe,
            access_token: this.props.token,
            topsongs: {},
            topartists: {}
        } 
        this.setState({
            topsongs: this.getTop("tracks"),
            topartists: this.getTop("artists")
        });
    } 

    getTop = (type) => {
        const {access_token,timeframe} = this.state;
        const TOP = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeframe}&limit=50&offset=0`;
        console.log(TOP);
        fetch(TOP, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then( response => response.json()).then(responsejson => { 
            console.log(responsejson); 
        });
    } 

    componentDidUpdate(prevProps) {
        if (this.props.timeframe !== prevProps.timeframe) {
            this.setState({timeframe: this.props.timeframe});
            this.setState({
                topsongs: this.getTop("tracks"),
                topartists: this.getTop("artists")
            });
        }
    }

    render() { 
        return <h2>{this.state.timeframe}</h2>;
    }
} 

export default TopItems; 
