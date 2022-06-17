import React from "react";
import axios from "axios";
import NftImage from "../components/NftImage";

class Detail extends React.Component{

    state = {
        data2 : []
    }

    getAPI =  async ( data ) => {
        const url1 = process.env.MIDDLE

        const {option, keyword} = data
        const url = url1  +  `/search?${option}=${keyword}`

        const api2 = await axios({
            method: 'get',
            url: url,
        })
        const data2 = JSON.parse(api2.data);

        console.log(data2);

        this.setState({data2}) //.get(url);
    }

    componentDidMount(){

        console.log("---")
        const {location, history} = this.props;

        const data = location.state;        

        this.getAPI(data );

        if(location.state ===undefined){
            history.push("/");
        }

    }
    render(){

        console.log("---")
        const { location} = this.props;

        const {data2} = this.state;

        let images;

        if(data2){

        images = data2.map( info => {

            const {
                image_uri ,
                href,
                creator,
                price,
                name,
                marketplace,
                token_address,
                token_id,
                unit
              } = info;

              return <NftImage 
              img_src={image_uri}
              href={href}
              creator={creator}
              price={price}
              name={name}
              marketplace ={marketplace}
              token_address={token_address}
              token_id={token_id}
              unit={unit}
  
            /> 
        })}

        const {
            img_src,
            href,
            creator,
            price,
            name,
            marketplace,
            token_address,
            token_id,
            unit
        } = location.state;
        

        if(location.state){
        return <>
            
            <NftImage 
                img_src={img_src}
                href={href}
                creator={creator}
                price={price}
                name={name}
                marketplace ={marketplace}
                token_address={token_address}
                token_id={token_id}
                unit={unit}
            />

            <h2> recommend list </h2>
            <div className="images" style={{display:'flex', flexDirection:'row', width:"300px" }}>
            {images}

            </div>
        </>
        }else{
            return null;
        }
    }
}

export default Detail;