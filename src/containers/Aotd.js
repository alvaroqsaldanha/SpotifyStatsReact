import React, { Component } from 'react'; 
import './Aotd.css';
import { genres } from '../components/genres';

class Aotd extends Component { 

    constructor(props) { 
        super(props);
        this.state = {
            albumcover: '',
            albumtitle: '',
            artist: '',
            link: '',
            uri_album: '',
            uri_song: '',
            index: 0,
            songs: {}
        }
        this.getSongs();
    } 

    getSongs = () => {
        const {token} = this.props;
        const seedartists = encodeURIComponent(this.props.ids.first + "," + this.props.ids.second);
        const seedgenres = encodeURIComponent(genres[Math.floor(Math.random() * (genres.length - 0 + 1) + 0)] + "," + genres[Math.floor(Math.random() * (genres.length - 0 + 1) + 0)]);
        const seedtracks = encodeURIComponent("");
        const limit = encodeURIComponent('50');
        const AOTD = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seedartists}&seed_genres=${seedgenres}&seed_tracks=${seedtracks}`;
        fetch(AOTD, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( response => response.json()).then(responsejson => { 
            this.setState({songs: responsejson});
            this.setSong();
        });
    } 

    play = () => {
        const {token} = this.props;
        const {uri_album} = this.state;
        const PLAY = "https://api.spotify.com/v1/me/player/play"; 
        var obj = new Object();
        obj.context_uri = uri_album;
        obj.position_ms  = 0;
        fetch(PLAY, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        }).then( test => console.log("")
            //CHECK FOR ERROR!
        );
    } 

    addToQueue = () => {
        const {token} = this.props;
        const {uri_song} = this.state;
        const QUEUE = `https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(uri_song)}`;
        fetch(QUEUE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( response => console.log("")
            //CHECK FOR ERROR!
        );
    }

    setSong = () => {
        const {index, songs} = this.state;
        if (index > 49) this.setState({index:0});
        this.setState({
            artist: songs.tracks[index].artists[0].name + " - " + songs.tracks[index].name,
            albumcover: songs.tracks[index].album.images[1].url,
            link: songs.tracks[index].external_urls.spotify,
            index: index + 1,
            uri_album: songs.tracks[index].album.uri,
            uri_song: songs.tracks[index].uri
        }); 
    } 

    render() {
        const {closefunction} = this.props; 
        const {artist, albumcover, link} = this.state;
        return (<div>
                    <div className="container"> 
                        <h2 className="aotdartist"><a href={link} target="_blank">{artist}</a></h2>
                        <a href={link} target="_blank"><img className="aotdcover" src={albumcover} /></a>
                        <div className="player">
                            <button className="dropdown button1" onClick={() => this.play()}>Play</button>
                            <button className="signoutbutton button1" onClick={() => this.addToQueue()}>Add to Queue</button> 
                        </div>
                        <footer>
                            <button className="dropdown dropdowntf button1"  onClick={() => this.setSong()}>Refresh</button>
                            <button className="signoutbutton button1"  onClick={() => closefunction(false)}>Back</button>
                        </footer>
                    </div>
                </div>); 
    }
} 
 
export default Aotd;