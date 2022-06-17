import React from "react";
import {Link} from "react-router-dom";
import "./Movie.css"


function NftImage({ img_src, href, creator, price,name,  marketplace, token_address, token_id, unit, flexDirection }) {


    console.log(href)
    return (
        <div style={{display:'flex', flexDirection:'column'}} >
    <Link
    to={{
        pathname: `/nft/${token_id}`,
        state: {
            img_src, 
            href, 
            creator, 
            price,
            name,  
            marketplace, 
            token_address, 
            token_id, 
            unit
        }
    }}>
            <img className="nft_image" src={img_src} alt="loading..." width="300px" />
            
    </Link>

    <div className="nft_data" >
    <a className="source_link" href={href} > link </a>
    <h3 className="nft_creator"  >creator: {creator}</h3>
    <h3 className="nft_name">name: {name}</h3>
    <h3 className="price">price: {price}</h3>
    <h3  className= "nft_marketplace" >
        site: {marketplace}
    </h3>
</div>
</div >
    );
}




export default NftImage;