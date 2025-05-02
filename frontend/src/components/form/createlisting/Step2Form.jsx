import './stepForm.css'

import React, {useEffect, useState} from 'react'

import Decrement from '../buttons/Decrement'
import Increment from '../buttons/increment'
import LargeImage from '../../imageLayout/LargeImage'
import Layout from '../../imageLayout/Layout'
import PlaceBodyDetails from '../../place/placebody/PlaceBodyDetails'
import PlaceImageLayout from '../../imageLayout/placeImageLayout'
import SingleImage from '../../imageLayout/SingleImage'
import categories from '../../Defaults/Categories'
import { essentialAmenities } from '../../Defaults/amenities'

function Step2Form({description, setDescription, setAmenities, amenities, title, setTitle, price, setPrice, files, setFiles, setFilesURL}) {

  const [images, setImages] = useState()

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

  function transformPlace(place, owner_id) {
    return {
      title: place.title,
      latitude: place.latitude,
      longitude: place.longitude,
      description: place.description,
      price: place.price,
      bathrooms: place.bathrooms,
      bedrooms: place.bedrooms,
      beds: place.beds,
      city: place.city,
      images: place.img,
      property_type: place.type,
      address: place.address,
      rating: place.rating,
      owner_id: owner_id || ownerID,
      url: place.url,
      deeplink: place.deeplink,
      host_thumbnail: place.hostThumbnail,
      super_host: place.superHost,
    };
  }

  const handleAmenitySelection = (e) => {
    e.target.classList.add('selected')
    setAmenities((prev) => [...prev, e.target.innerText])
  }

  const handleImageStore = (e) => {
    console.log("images.target", e)

    setFiles((prev) => [...prev, images[0]])
    setFilesURL((prev) => [...prev, URL.createObjectURL(images[0])])
    setImages(null)
    console.log("files", files)
  }

  const renderFileList = () => (<ol style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
    {[...files].map((f, i) => (
      <span style={{display: 'flex', alignItems: 'center', margin: '3px', opacity: '0.5'}}>
        <span 
          style={{
            fontSize: '10px', 
            borderRadius: '50px', 
            padding: '0px 5px', 
            background: '#444', 
            color: '#fff', 
            fontWeight: 'bold', 
            marginRight: '5px'
          }}
        >
          {i}
        </span>
        <li style={{fontSize: '12px'}} key={i}>{f.name} - {f.type}</li>
      </span>
    ))}
  </ol>)

  useEffect(() => {
    console.log("files", files)
  }, [setFiles])
  

  return (
    <div style={{marginTop: '30px'}}>
      <h2 style={{textAlign: 'left'}}>Step 2: Make your place standout</h2>
      <hr></hr>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{marginRight: '10px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing name:</h4>
              <input style={{width: '300px', borderRadius: '8px'}} onChange={(e) => setTitle(e.target.value)} value={title}></input>
            </div>

            <div>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing price:</h4>
              <input style={{width: '120px'}} type="number" placeholder="Price" className="input-field" onChange={(e) => setPrice(e.target.value)} value={price}/>
            </div>
          </div>

          <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing description:</h4>
            <textarea style={{width: '400px', borderRadius: '8px'}} onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
          </div>
          
          <div style={{textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Amenities:</h4>
            {Object.entries(essentialAmenities).map((k, index) => {
                return <button key={index} style={{fontSize: '13px', backgroundColor: amenities.map((item) => item == k[1] && "aqua" )}} onClick={(e) => handleAmenitySelection(e)}>{k[1]}</button>
            })}
          </div>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Attach photos (5 minimum):</h4>
            <input 
              type="file" 
              accept="image/*"
              multiple
              onChange={(e) => setImages(e.target.files)}/>
              
            <button style={{marginLeft: '3px'}} onClick={() => handleImageStore()}>Upload</button>

            {renderFileList()}
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Step2Form