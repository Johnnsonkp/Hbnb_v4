import '../components/ListingCard/listingContainer.css'
import '../components/ListingCard/listings.css'
import '../components/ListingCard/listingContainer.css'

import { parsedPlace, parsedPlaces } from '../utilities/placeUtilities';
import { useEffect, useState } from 'react';

import Categories from '../components/Defaults/Categories';
import CategoriesCarousel from '../components/categories/Categories';
import ListingCard from '../components/ListingCard/ListingCard';
import ListingContainer from '../components/ListingCard/ListingContainer';
import ListingDefault from '../components/Defaults/Listings'
import ListingsSkeleton from '../components/ListingCard/ListingsSkeleton';
import { PlaceContext } from '../store/context/placeContext';
import React from 'react'
import { getJWTToken } from '../utilities/localStorage'
import { shuffleArray } from '../utilities/placeUtilities';
import { storePlaces } from '../store/actions/placeActions';
import { useContext } from 'react';

function Listings() {
  const [filterListing, setFilterListings] = useState(null)
  const [filteredListings ,setFilteredListings] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const accessToken = localStorage.getItem('access_token');
  const [searchParams, setSearchParams] = useState({
    search: '',
    category: '',
    checkin: '',
    checkout: ''
  });
  // const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND
  const BASE_URL = window.location.origin
  const API = import.meta.env.VITE_API_PATH
  const places_path = import.meta.env.VITE_PLACES_PATH
  
  console.log(`Listings URL:, ${BASE_URL}/${API}/${places_path}`)

  const getListingfromTxt = async () => {
    try {
      // fetch(`http://127.0.0.1:5000/api/v1/places/search`, {
      fetch(`${BASE_URL}/${API}/${places_path}/search`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        mode: 'cors'
      });

      // const data = await response.json();
      // return data
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  // const allPlaces = async () => {
  //   try {
  //     // const response = await fetch('http://127.0.0.1:5000/api/v1/places/all', {
  //     const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         // 'Authorization': `Bearer ${accessToken}`
  //       },
  //       mode: 'cors',
  //       // credentials: 'include',
  //     });

  //     const data = await response.json();
  //     return data
  //   } catch (error) {
  //     console.error('Failed to fetch listings:', error);
  //   }
  // };

  const allPlaces = async () => {
    try {
      // const response = await fetch(`${BASE_URL}/${API}/${places_path}`, {
      const response = await fetch('http://127.0.0.1:5000/api/v1/places/all', {
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
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      search: params.get('search') || '',
      category: params.get('category') || '',
      checkin: params.get('checkin') || '',
      checkout: params.get('checkout') || ''
    });
  }, []);


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
          storePlaces(ListingDefault, placeDispatch);
      })  
    }
  }, []);

  useEffect(() => {
    if(filterListing !== null){
      let allListings = placeState?.placeListings

      const typeOfPlace = filterListing.typeOfPlace
        ? allListings?.filter(listing =>
            listing?.type?.toLowerCase().includes(filterListing.typeOfPlace.toLowerCase())
          )
        : allListings;

      const propertyType = filterListing.propertyType !== null ? 
        typeOfPlace.filter((listing) => listing.type.includes(filterListing.propertyType)) : typeOfPlace

      const minPriceRange = filterListing.priceRange.min !== null? 
        propertyType.filter((listing) => listing.price >= filterListing.priceRange.min) : propertyType

      const maxPriceRange = filterListing.priceRange.max !== null?  
        minPriceRange.filter((listing) => listing.price <= filterListing.priceRange.max) : minPriceRange

      console.log("filterListing !== null)", maxPriceRange)
      setFilteredListings(maxPriceRange)
    }

    if(searchParams.search !== "" || searchParams.category !== "" && placeState?.placeListings){
      let allListings = placeState?.placeListings

      const propertyType = searchParams?.category !== "" ? 
        allListings && allListings?.filter((listing) => listing.type == searchParams.category) : allListings

      const city = searchParams?.search !== "" ? 
        allListings && allListings?.filter((listing) => listing.city == searchParams.search) : propertyType

      setFilteredListings(city)
    }

    console.log("searchParams", searchParams)
  }, [filterListing, searchParams, placeState?.placeListings])
  
  return (
    <div style={{marginTop: '70px'}} className='page-content'>
      <hr style={{backgroundColor: '#666', opacity: '0.3'}}></hr>
      
      <CategoriesCarousel Categories={Categories} setFilterListings={setFilterListings}/>
      
      {placeState.placeListings? 
        <ListingContainer listings={filteredListings || placeState.placeListings}/> : 
        <ListingsSkeleton />}
    </div>
  )
}

export default Listings