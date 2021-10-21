import React, { Component } from 'react'; 
import './Aotd.css';

class Aotd extends Component { 

    constructor(props) { 
        super(props);
        this.state = {
            albumcover: '',
            albumtitle: '',
            artist: '',
            link: ''
        }
        this.getAlbum();
    } 

    getAlbum = () => {
        const {token} = this.props;
        const seedartists = encodeURIComponent('4NHQUGzhtTLFvgF5SZesLK');
        const seedgenres = encodeURIComponent('classical,country');
        const seedtracks = encodeURIComponent('0c6xIDDpzE81m2q797ordA');
        const limit = encodeURIComponent('1');
        const AOTD = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seedartists}&seed_genres=${seedgenres}&seed_tracks=${seedtracks}`;
        console.log(AOTD);
        console.log(token);
        fetch(AOTD, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then( test => test.json()).then(test1 => { 
            console.log(test1);
            this.setState({
                artist: test1.tracks[0].artists[0].name + " - " + test1.tracks[0].name,
                albumcover: test1.tracks[0].album.images[1].url,
                link: test1.tracks[0].external_urls.spotify
            }); 
        });
    }

    render() {
        const {closefunction} = this.props; 
        const {artist, albumcover, link} = this.state;
        return (<div>
                    <div className="container"> 
                        <h2 className="aotdartist"><a href={link} target="_blank">{artist}</a></h2>
                        <a href={link} target="_blank"><img className="aotdcover" src={albumcover} /></a>
                        <footer>
                            <button className="dropdown"  onClick={() => this.getAlbum()}>Refresh</button>
                            <button className="signoutbutton"  onClick={() => closefunction(false)}>Back</button>
                        </footer>
                    </div>
                </div>); 
    }
} 
 
export default Aotd;