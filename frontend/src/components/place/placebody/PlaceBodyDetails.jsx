import { useContext, useState } from 'react'

import BookNow from '../../buttons/bookingButton/BookNow'
import { PlaceContext } from '../../../store/context/placeContext'
import React from 'react'

function PlaceBodyDetails({handleBooking, bookBtn, customStyles, customType, customPlaceDetails, customAddress}) {
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  
  const styles = {
    default: {
      maxWidth: "1280px", 
      paddingLeft: '4.3rem', 
      paddingRight: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start'
    }
  }

  const handleSubmit = () => {
    setLoading(true)

    setTimeout(() => {
      alert("Initiating booking!")
      handleBooking()
    }, [5000])
  }
  return (
    <div style={customStyles || styles.default}>
        <h2 style={{}}>{placeState.placeDetails?.type || customType || "Property"} in {customAddress || placeState.placeDetails?.address}</h2>
        <div style={{display: 'flex'}}>
          <p>{placeState.placeDetails?.bedrooms || customPlaceDetails?.bedrooms || 1} bedrooms <span style={{margin: '2px'}}></span> </p>
          <p> {placeState.placeDetails?.beds || customPlaceDetails?.beds || 1} beds <span style={{margin: '2px'}} ></span> </p>
          <p> {placeState.placeDetails?.baths || customPlaceDetails?.bathrooms || 1} bathrooms</p>
        </div>

      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <p>Hosted by </p>
          {placeState.placeDetails.hostThumbnail? <img style={{width: '40px', borderRadius: '100%', margin:'5px'}} src={placeState.placeDetails.hostThumbnail} /> : 
          <div style={{width: '30px', marginLeft: '5px', borderRadius: '100%', background: '#333', color: '#fff', height: '30px', alignItems: "center", justifyContent: "center",
            display: 'flex', fontSize: '12px'}}>U</div>}
        </div>

        {bookBtn !== "hide" && 
          <BookNow cta={"Book Now"} loading={loading} func={() => handleSubmit()}/>}
      </div>
    </div>
  )
}

export default PlaceBodyDetails