import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { useContext, useState } from 'react'

import BookNow from '../../buttons/bookingButton/BookNow'
import GoogleMaps from '../../maps/googleMaps';
import { PlaceContext } from '../../../store/context/placeContext'
import React from 'react'

function PlaceBodyDetails({handleBooking, bookBtn, customStyles, customType, customPlaceDetails, customAddress}) {
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const BASE_URL = window.location.origin
  const API = import.meta.env.VITE_API_PATH
  const places_path = import.meta.env.VITE_PLACES_PATH
  
  const styles = {
    pageWrapper: {
      padding: "1rem",
      paddingTop: '0px',
      paddingBottom: '0px',
      // border: '1px solid red'
    },
    default: {
      // maxWidth: "1280px",
      // border: '1px solid red',
      maxWidth: "1200px",
      margin: "auto 0",
      padding: "0.3rem 1.1rem",
      paddingTop: '0px',
      // paddingLeft: '4.3rem', 
      // paddingRight: '2rem', 
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

  const listing = {
    address: placeState.placeDetails?.address,
    bathrooms: placeState.placeDetails?.bathrooms || 1,
    bedrooms: placeState.placeDetails?.bedrooms || 1,
    beds: placeState.placeDetails?.beds || 1,
    city: placeState.placeDetails?.city,
    deeplink: placeState.placeDetails?.deeplink,
    description: placeState.placeDetails?.description || placeState.placeDetails?.title,
    host_thumbnail: placeState.placeDetails?.host_thumbnail || placeState.placeDetails?.hostThumbnail,
    images: placeState.placeDetails?.images || placeState.placeDetails?.img,
    latitude: placeState.placeDetails?.latitude,
    longitude: placeState.placeDetails?.longitude,
    price: placeState.placeDetails?.price,
    rating: placeState.placeDetails?.rating || 4,
    superHost: placeState.placeDetails?.superHost || false,
    title: placeState.placeDetails?.title,
    type: placeState.placeDetails?.type,
    url: placeState.placeDetails?.url,
    // owner_id: placeState.placeDetails?.owner_id || placeState.placeDetails?.userId,
    owner_id: placeState.placeDetails?.owner_id || "0a4a5f86-cca6-4f1e-9f18-bb1f9c59ea8c" || "794958ab-1bbc-4994-bc6f-1fdd58494edc",
  };

  const postPlace = async () => {
    console.log("postplace", listing)
    try {
      const response = await fetch(`${BASE_URL}/${API}/${places_path}/add_place`, {
      // const response = await fetch('http://127.0.0.1:5000/api/v1/places/add_place', {
      // const response = await fetch(`${BASE_API_URL}/${API}/${places_path}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(listing),
      });
  
      const data = await response.json();
      // const data = await response;
      return data;
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  // async function init() {
  //   await customElements.whenDefined('gmp-map');

  //   const map = document.querySelector('gmp-map');
  //   const marker = document.querySelector('gmp-advanced-marker');
  //   const placePicker = document.querySelector('gmpx-place-picker');
  //   const infowindow = new google.maps.InfoWindow();

  //   map.innerMap.setOptions({
  //     mapTypeControl: false
  //   });

  //   placePicker.addEventListener('gmpx-placechange', () => {
  //     const place = placePicker.value;

  //     if (!place.location) {
  //       window.alert(
  //         "No details available for input: '" + place.name + "'"
  //       );
  //       infowindow.close();
  //       marker.position = null;
  //       return;
  //     }

  //     if (place.viewport) {
  //       map.innerMap.fitBounds(place.viewport);
  //     } else {
  //       map.center = place.location;
  //       map.zoom = 17;
  //     }

  //     marker.position = place.location;
  //     infowindow.setContent(
  //       `<strong>${place.displayName}</strong><br>
  //        <span>${place.formattedAddress}</span>
  //     `);
  //     infowindow.open(map.innerMap, marker);
  //   });
  // }

  // document.addEventListener('DOMContentLoaded', init);

  // <script type="module" src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js">
  //   </script>


  return (
    <div style={styles.pageWrapper}>
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
            <BookNow cta={"Reserve"} loading={loading} func={() => handleSubmit()}/>}

            {/* <BookNow cta={"Post to backend"} loading={loading} func={() => postPlace()}/> */}
            <button style={{display: 'none'}} onClick={() => postPlace()}>Post to backend</button>
        </div>
      </div>

      {/* <div id="map"></div> */}
      
      {/* <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={'AIzaSyBEIQfRWV0wuQCfLqTYjGoA_y9iM5HgoqU'} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          defaultZoom={13}
          defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
          onCameraChanged={ (ev) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        >
        </Map>
      </APIProvider>
      </div> */}
      
      {/* <div style={{ height: '100vh', width: '100%' }}>
        <gmpx-api-loader 
          key="AIzaSyBQyr5LWUaBHtMZbf6O8vinY8BOHBZKTKQ" 
          solution-channel="GMP_GE_mapsandplacesautocomplete_v2">
        </gmpx-api-loader>
        <gmp-map center="40.749933,-73.98633" zoom="13" map-id="DEMO_MAP_ID">
          <div slot="control-block-start-inline-start" class="place-picker-container">
            <gmpx-place-picker placeholder="Enter an address"></gmpx-place-picker>
          </div>
          <gmp-advanced-marker></gmp-advanced-marker>
        </gmp-map>
      </div> */}

        {/* <GoogleMaps /> */}

    </div>
  )
}

export default PlaceBodyDetails


// a487cf37a97fa97658e12eb0