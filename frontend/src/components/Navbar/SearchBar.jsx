import './nav.css'

import React, { useCallback, useState } from 'react'

import { PlaceContext } from '../../store/context/placeContext'
import { parsedPlaces } from '../../utilities/placeUtilities'
import { storePlaces } from '../../store/actions/placeActions'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

function SearchBar() {
  const [location, setLoaction] = useState(null)
  const [loading, setLoading] = useState(false)
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND
  const API = import.meta.env.VITE_API_PATH
  const places_path = import.meta.env.VITE_PLACES_PATH

  const handleChange = useCallback((val) => {
    setLoaction(val.target.value)
    console.log("val", val.target.value)
  })

  const styles = {
    searchBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--color-white)",
      borderRadius: "0.5rem",
      margin: "auto",
      flex: "0.4"
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    let arr = []
    storePlaces(arr, placeDispatch)

    try {
      // const response = await fetch('http://127.0.0.1:5000/api/v1/places/search', {
      const response = await fetch(`${BASE_URL}/${API}/${places_path}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          market: location.replace(/\s+/g, '')
        })
      });
      const data = await response.json();
      console.log("data", data.results)
      let parsedD = parsedPlaces(data.results)

      storePlaces(parsedD, placeDispatch)

      setLoading(false)
      navigate(`/listings/${location}`)
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      setLoading(false)
    }
    setLoading(false)
  }

  
  return (
    <div style={styles.searchBox}>
      <div className="search-box-inner">
        <input onChange={(e) => handleChange(e)} type="text" placeholder="Search..." className="input-field" />
        <select className="input-field">
          <option value="">Category</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
        <input type="number" placeholder="Min Price" className="input-field" />
        <input type="number" placeholder="Max Price" className="input-field" />
        
        <button className="search-button" onClick={(e) => handleSearch(e)}>
          {loading? <div className='loader'></div> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="icon" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>}
        </button>
      </div>
    </div> 
  )
}

export default SearchBar