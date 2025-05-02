import React, {useState} from 'react'

import FilterBtn from '../buttons/filterBtn/filterBtn'
import { essentialAmenities } from '../Defaults/amenities'

function FilterModel({setFilterListings}) {
  const [showModel, setShowModel] = useState(false)
  const [listingFilters, setListingFilters] = useState({
    typeOfPlace: null,
    propertyType: null,
    amenities: null,
    priceRange: {
      min: null,
      max: null
    }
  })
  
  const styles = {
    overlay: {
      position: "fixed",
      zIndex: "50",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      backgroundColor: "rgba(17, 24, 39, 0.6)",
      overflowY: "auto",
      height: "100%",
      width: "100%",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      display: showModel? 'block' : 'none',
    },
    filterBox: {
      position: "relative",
      top: "8rem",
      marginLeft: "auto",
      marginRight: "auto",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.375rem",
      backgroundColor: "white",
      maxWidth: "28rem"
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'flexEnd',
      padding: '2px'
    },
    closeButton: {
      color: 'gray',
      background: 'transparent',
      borderRadius: '100%',
      fontSize: '10px',
      padding: '0.3rem',
      marginLeft: 'auto',
      display: 'inlineFlex',
      justifyContent: 'center'
    },
    svg: {
      width: '20px',
      height: '20px'
    }
  }
  const typeOfPlace = ["Any type", "Room", "Entire home"]
  const resetForm = () => {
    setListingFilters({
      typeOfPlace: null,
      propertyType: null,
      amenities: null,
      priceRange: {
        min: null,
        max: null
      }
    })
  }

  const handleSubmit = () => {
    setFilterListings(listingFilters)
    resetForm()
    setShowModel(!showModel)
  }
  
  return (
    <>
      <FilterBtn onClick={() => setShowModel(!showModel)}/>
      <div style={styles.overlay}>
        
        <div style={styles.filterBox}>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
            <h3>Filters</h3>
            <div style={styles.modalHeader}>
              <button onClick={() => setShowModel(!showModel)} style={styles.closeButton}>
                  <svg  style={styles.svg} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"></path>
                  </svg>
              </button>
            </div>
          </div>

          <hr></hr>

          <div style={{textAlign: 'left', padding: '15px'}}>

            <div>
              <h3>Type of place</h3>
              {typeOfPlace.map((type, index) => (
                  <button key={index} 
                    onClick={() => setListingFilters((prev) => ({...prev, typeOfPlace: type })) }
                  >
                      {type}
                  </button>
                ))}
            </div>

            <div>
              <h3>Price range</h3>
              <input 
                type="number" 
                placeholder='min price'
                value={listingFilters.priceRange.min || 0}
                onChange={(e) => setListingFilters((prev) => ({ ...prev, priceRange: {...prev.priceRange,
                  min: e.target.value }}))}
              />
              <input 
                type="number" 
                placeholder='max price'
                value={listingFilters.priceRange.max || 1000}
                onChange={(e) => setListingFilters((prev) => ({ ...prev, priceRange: {...prev.priceRange,
                  max: e.target.value }}))}
              />
            </div>
            
            <div>
              <h3>Essential amenities</h3>
              {Object.values(essentialAmenities).map((value, index) => (
                  <button 
                    key={index}
                    onClick={() => setListingFilters((prev) => ({...prev, amenities: [
                      ...prev.amenities,
                      !prev.amenities.includes(value)? value : ''
                    ]}))}
                  >{value}</button>
                ))}
            </div>

            <h3>Property type</h3>
          </div>

          <div style={{display: 'flex', padding: '15px'}}>
            <button onClick={() => resetForm()}>Clear all</button>
            <button onClick={() => handleSubmit()}>Show places</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterModel