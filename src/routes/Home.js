import React from 'react';
//import PropTypes from "prop-types";
import axios from "axios";
import "./Home.css"
import NftImage from '../components/NftImage';

class Home extends React.Component {
  state = {
    isLoading: true,
    data: [],
    keyword : "",
    count : 10,
    option: "creator"
  };
  getNfts = async () => {

    const url = process.env.MIDDLE

    const api = await axios({
      method: 'get',
      url: url,
    });
    const data =  JSON.parse(api.data);


    this.setState({data, isLoading: false});
  };


  componentDidMount() {

    this.getNfts();
  }
  render(){

    const {isLoading, data,
       keyword, option, count } = this.state;

    const onChange = (event) =>  {
      const {
        target: {
          value
        }
      } = event;
      this.setState({ keyword: value})
    }

    const onOptionChange = (event) =>  {
      const {
        target: {
          value
        }
      } = event;
      this.setState({ option: value})
    }

    const onCountChange = (event) => {
      const {
        target: {
          value
        }
      } = event;

      this.setState({ count: value})
    }

    const onSubmit = async () => {

      const ref = process.env.MIDDLE
      const url = ref +option+"="+keyword + "&count="+ count;

      console.log(url);
      const api = await axios({
        method: 'get',
        url: url
      }); 


      const data =  JSON.parse(api.data);
      console.log(data)
  
  
      this.setState({data });
    }

    let images;

    images = data.map( ( info ) => {
      const {
        image_uri,
        marketplace_uri,
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
                href={marketplace_uri}
                creator={creator}
                price={price}
                name={name}
                marketplace ={marketplace}
                token_address={token_address}
                token_id={token_id}
                unit={unit}
    
    /> })

    return (
    <section className="container">
      {  isLoading ? (
      <div className="loader" >
        
        
        <span className="loader_text">Loading...</span>
        </div>
      ): ( 

          <div>
           
              <h4>검색</h4>
          <input value={keyword}  placeholder='type your keyword' onChange={onChange} />
          
          <select name="label" onChange={ onOptionChange} >
            <option value= "creator">creator</option>
            <option value= "marketplace">marketplace</option>
            <option value= "name">name</option>
            <option value= "style">style</option>
            <option value= "unit">unit</option>
            <option value= "description"> description</option>
          </select>
          <select onChange={onCountChange}>
            <option value="10">10개씩 조회</option>
            <option value="20">20개씩 조회</option>
          </select>

          <button onClick={onSubmit} > Search</button>


        <h1>Recommend List</h1>
      <div className="images" style={{  flexDirection:'row'}} >
        {images}

      </div>
      </div>
      )}

     </section>
    );
  }
}

export default Home;

