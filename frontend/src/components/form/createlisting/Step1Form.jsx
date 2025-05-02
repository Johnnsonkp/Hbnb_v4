import React, {useState} from 'react'

import Decrement from '../buttons/Decrement'
import Increment from '../buttons/increment'
import LargeImage from '../../imageLayout/LargeImage'
import Layout from '../../imageLayout/Layout'
import PlaceBodyDetails from '../../place/placebody/PlaceBodyDetails'
import PlaceImageLayout from '../../imageLayout/placeImageLayout'
import SingleImage from '../../imageLayout/SingleImage'
import categories from '../../Defaults/Categories'

function Step1Form({setCategory, setPlaceDetails, placeDetails, address, setAddress, setCity, city}) {
  const [pDetails, setPDetails] = useState({
    bedrooms: 0,
    beds: 0,
    bathrooms: 0
  })

  const customStyles = {
    pageWrapper: {
      padding: '0px'
    },
    container: {
      padding: "0.1rem 1rem"
    },
    bodyStyles: {
      maxWidth: "1280px", 
      paddingLeft: '0.6rem', 
      paddingRight: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
    }
  }

  return (
    <div style={{marginTop: '30px'}}>
      <h2 style={{textAlign: 'left'}}>Step 1: Tell us about your place</h2>
      <hr></hr>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          
          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px'}}>Property type:</h4>
            <select onChange={(e) => setCategory(e.target.value)} >
              {categories && categories.map((category, index) => (
                  <option key={index} placeholder={"select property type"}>{category.title}</option>
                ))}
            </select>
          </div>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px'}}>Place details:</h4>
            
            <div style={{display: 'flex', justifyContent: 'space-between', width: '450px'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Decrement onClick={() => setPlaceDetails((prev) => ({...prev, bedrooms: prev.bedrooms > 0? prev.bedrooms - 1 : 0}) )} />
                  <button style={{fontSize: '13px', background: 'transparent', color: '#333'}}>Bedrooms: {placeDetails.bedrooms}</button>
                <Increment onClick={() => setPlaceDetails((prev) => ({...prev, bedrooms: prev.bedrooms + 1}) )} />
              </div>  

              <div style={{display: 'flex', alignItems: 'center'}}>
                <Decrement onClick={() => setPlaceDetails((prev) => ({...prev, beds: prev.beds > 0? prev.beds - 1 : 0}) )} />
                  <button style={{fontSize: '13px', background: 'transparent', color: '#333'}}>Beds: {placeDetails.beds}</button>
                <Increment onClick={() => setPlaceDetails((prev) => ({...prev, beds: prev.beds + 1}) )} />
              </div> 

              <div style={{display: 'flex', alignItems: 'center'}}>
                <Decrement onClick={() => setPlaceDetails((prev) => ({...prev, bathrooms: prev.bathrooms > 0? prev.bathrooms - 1 : 0}) )} />
                  <button style={{fontSize: '13px', background: 'transparent', color: '#333'}}>Bathrooms: {placeDetails.bathrooms}</button>
                <Increment onClick={() => setPlaceDetails((prev) => ({...prev, bathrooms: prev.bathrooms + 1}) )} />
              </div> 
            </div>
                
            
          </div>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px'}}>

            <h4 style={{marginBottom: '8px'}}>Address:</h4>
            <input style={{width: '400px', borderRadius: '8px'}} onChange={(e) => setAddress(e.target.value)} value={address}></input>

            <h4 style={{marginBottom: '8px'}}>City:</h4>
            <input style={{width: '400px', borderRadius: '8px'}} onChange={(e) => setCity(e.target.value)} value={city}></input>
            
            <div style={{border: '1px solid lightGray', marginTop: '10px', height: '250px', width: '400px', borderRadius: '10px'}}></div>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Step1Form