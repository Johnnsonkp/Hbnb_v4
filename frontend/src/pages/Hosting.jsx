import { useContext, useEffect } from 'react'

import ListingTable from '../components/listingTable/ListingTable'
import { PlaceContext } from '../store/context/placeContext'
import React from 'react'
import { UserContext } from '../store/context/userContext'
import { dynamicImgSrc } from '../utilities/utils'
import { parsedPlaces } from '../utilities/placeUtilities'
import { shuffleArray } from '../utilities/placeUtilities'
import { storePlaces } from '../store/actions/placeActions'
import { useNavigate } from 'react-router'

function Hosting() {
  const {userState, userDispatch} = useContext(UserContext);
  const {placeState, placeDispatch} = useContext(PlaceContext);
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND
  const API = import.meta.env.VITE_API_PATH
  const places_path = import.meta.env.VITE_PLACES_PATH
  
  console.log("userState.user", userState?.user)
  console.log("userState", userState)

  placeState?.placeListings && placeState?.placeListings.map((listing) => {
    listing.owner_id == userState?.user?.id && console.log("listing owner", listing)
  })

  const createListing = () => {
    navigate('/hosting/create-place')
  }

  const allPlaces = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${API}/${places_path}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };
    
  useEffect(() => {
    if(!placeState.placeListings){
      allPlaces()
        .then((data) => {
          if(data){
            console.log("data", data)

            let parsedData = parsedPlaces(data)
            const combinedData = parsedData;
            let shuffledData = shuffleArray(combinedData)
            storePlaces(shuffledData, placeDispatch);
            return
          }
      })  
    }
  }, [placeState.placeListings]);


  return (
    <div style={{marginTop: '6rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>Welcome, {userState?.user?.first_name || ''}</h3>
        <button style={{backgroundColor: '#f4f4f4', color: '#333', display: 'flex'}} onClick={() => createListing()}>
          <img style={{width: '25px', fontWeight: 'bold'}} src={dynamicImgSrc('create-50.png')} />
          <span>Add listing</span>
        </button>
      </div>

      <div>
        <h4 style={{textAlign: 'left'}}>Your Listings</h4>
       {placeState && placeState?.placeListings && placeState?.placeListings.length?  <ListingTable placeState={placeState}/> : ""}
      </div>
    </div>
  )
}

export default Hosting