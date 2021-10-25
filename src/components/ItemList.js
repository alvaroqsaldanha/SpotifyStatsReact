import React from 'react'; 
import Item from './Item';

const ItemList = ({index,tracks,artists}) => { 
    const idx = parseInt(index);
    const n = idx + 7 > tracks.length ? tracks.length - 1 : idx + 7;
    const tracks_slice = tracks.slice(idx,n);
    console.log(tracks_slice);
    const ItemEntries = tracks_slice.map((track, i) => {
        return <Item key={i} pos={idx + i + 1} name={tracks_slice[i].name} artist={tracks_slice[i].artists[0].name} link={tracks_slice[i].album.images[1].url} />
    })
    console.log(ItemEntries);
    return (
        <div className="test1">
            {ItemEntries}
        </div>
    );

} 
 
export default ItemList; 

