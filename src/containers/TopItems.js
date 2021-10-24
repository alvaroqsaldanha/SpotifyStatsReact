import React, { Component } from 'react'; 
import ItemList from './../components/ItemList';
import left from './leftarrow.png';
import right from './rightarrow.png';

class TopItems extends Component {

    constructor(props) { 
        super(props);
        this.state = {
            tracks: {},
            artists: {},
            index: "0",
            sent: 0
            
        } 
    } 

    componentDidMount() {
        this.getTop();     
    }

    async getTop(){
        const resptracks = await this.callApi("tracks");
        const responsejsontracks = await resptracks.json();
        const respartists = await this.callApi("artists");
        const responsejsonartists = await respartists.json();
        if (this.state.sent === 0) {
            this.props.getIds({first: responsejsonartists.items[0].id, second: responsejsonartists.items[1].id});
        }
        var returnObj = {};
        returnObj["tracks"] = responsejsontracks.items;
        returnObj["artists"] = responsejsonartists.items;
        returnObj["sent"] = 1;
        returnObj["index"] = 0;
        this.setState(returnObj);
    } 

    callApi = (type) => {
        const {token,timeframe} = this.props;
        const TOP = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeframe}&limit=50&offset=0`;
        return fetch(TOP, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    changePage = (dir) => { 
        const {index,tracks,artists} = this.state;
        var idx = parseInt(index);
        const n = (tracks.length > artists.length ? tracks.length : artists.length) - 1;
        if (dir > 0) 
            idx = idx + 10 > n ? idx = 0 : idx += 10;
        else
            idx = idx - 10 < 0 ? idx = n - (n % 10) : idx -= 10;
        this.setState({index:idx}); 
    }

    componentDidUpdate(prevProps) { 
        if (this.props.timeframe !== prevProps.timeframe) {
            this.getTop();
        }
    } 

    render() { 
        const {index,tracks,artists,sent} = this.state;
        if (sent === 0) return null;
        return (<div className="topitemscontainer">
            <header>
                <button onClick={() => this.changePage(0)}><img src={left}/></button>
                <h3>Top Tracks</h3>  
                <h3>Top Artists</h3> 
                <button onClick={() => this.changePage(1)}><img src={right}/></button>         
            </header> 
             
        </div>);
        //<ItemList index={index} tracks={tracks} artists={artists}/> 
    }
} 

export default TopItems; 
