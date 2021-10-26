import React from 'react'; 
import Item from './Item';

const ItemList = ({index,tracks}) => { 
    const idx = parseInt(index);
    if (idx >= tracks.length) return null;
    const n = idx + 7 > tracks.length ? tracks.length - 1 : idx + 7;
    const tracks_slice = tracks.slice(idx,n);
    console.log(tracks_slice);
    const ItemEntries = tracks_slice.map((track, i) => {
        try {
            if (tracks_slice[i].album !== undefined)
                return <Item key={i} pos={idx + i + 1} name={tracks_slice[i].name} artist={tracks_slice[i].artists[0].name} link={tracks_slice[i].album.images[1].url} />
            else
                return <Item key={i} pos={idx + i + 1} name={tracks_slice[i].name} artist={""} link={tracks_slice[i].images[1].url} />  
        } catch (error) {
            return <h3 style={{color:'white', textAlign:'center'}}>Can't Show this Item :(</h3>
        }

    })
    console.log(ItemEntries);
    return (
        <div className="list">
            {ItemEntries}
        </div>
    );

} 
 
export default ItemList; 

