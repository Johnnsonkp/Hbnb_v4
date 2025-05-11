import './categories.css'

import React, {useEffect, useState} from 'react'

import FilterBtn from '../buttons/filterBtn/filterBtn'
import FilterModel from '../modal/FilterModel'
import SortSlide from './SortSlide'

function CategoriesCarousel({Categories, setFilterListings}) {
  const [selected, setSelected] = useState()
  const [listingFilters, setListingFilters] = useState({
      typeOfPlace: null,
      propertyType: null,
      amenities: null,
      priceRange: {
        min: null,
        max: null
      }
    })
  const [searchParams, setSearchParams] = useState({
      search: '',
      category: '',
      checkin: '',
      checkout: ''
  });

  const handleSelect = (category) => {
    setSelected(category.title)
    setFilterListings({...listingFilters, typeOfPlace: category.title })
  }

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setSearchParams({
        search: params.get('search') || '',
        category: params.get('category') || '',
        checkin: params.get('checkin') || '',
        checkout: params.get('checkout') || ''
      });
    }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection:'row', width: '100%', marginTop: '15px', color: '#666'}}
      >
        {Categories && Categories.map((category, index) => (
          index <= 13 && ( 
          <button
            key={index}
            onClick={() => handleSelect(category)}
            className='filter-button'
            style={{
              cursor: 'pointer', 
              width: '100px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              textAlign: 'center',
              background: 'transparent',
              color: '#666',
              height: '50px',
              padding: '0px',
              border: 'none',
              borderBottom: `${selected == category.title? "1px solid #333" : "transparent"}`
            }}
          >
            <img style={{width: '23px', opacity: '0.9', objectFit: 'cover'}} src={category.image} />
            <p style={{fontSize: '10px', opacity: '0.8', paddingTop: '2px'}}>{category.title.slice(0, 15)}</p>
          </button>
        )))}

        <FilterModel setFilterListings={setFilterListings}/>
      </div>
      {/* <div style={{display: 'flex', alignItems: 'flex-start', alignItems: 'center'}}>
        <div>
          
          <SortSlide title_1={'List'} title_2={'Grid'}/>

        </div>
        <p>Property Type: {searchParams.category}</p>
      </div> */}
    </div>
  )
}

export default CategoriesCarousel