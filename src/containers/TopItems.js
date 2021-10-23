import React, { Component } from 'react'; 

class TopItems extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            tracks: {},
            artists: {}
        } 
        this.getTop("tracks");
        this.getTop("artists");
    } 

    async getTop(type){
        const {token,timeframe} = this.props;
        const TOP = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeframe}&limit=50&offset=0`;
        const resp = await fetch(TOP, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responsejson = await resp.json();
        this.props.getIds({first: responsejson.items[0].id, second: responsejson.items[1].id});
        var returnObj = {};
        returnObj[type] = responsejson.items;
        this.setState(returnObj);
    } 

    componentDidUpdate(prevProps) {
        if (this.props.timeframe !== prevProps.timeframe) {
            this.getTop("tracks");
            this.getTop("artists");
        }
    }

    render() { 
        console.log("a ", this.state.tracks);
        console.log("b ",this.state.artists);
        return <h2>{this.props.timeframe}</h2>;
    }
} 

export default TopItems; 
