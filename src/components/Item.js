import React from 'react';
import './Item.css' 

const Item = ({name,artist,link}) => { 
    return (
        <div className="itemcontainer">
            <img className="itemcover" src={link}></img>
            <p>{name}</p>
            <p>{artist}</p>
        </div>
    );
} 
 
export default Item; 

