import React from 'react';
import './Item.css' 

const Item = ({pos,name,artist,link}) => { 
    return (
        <div className="itemcontainer">
            <div className="gridcontainer">
                <img className="itemcover" src={link}></img>
                <h1 className="test">{pos}</h1>
                <p className="name">{name} <br/> {artist}</p>
            </div>
        </div>
    );
} 
 
export default Item; 

