import './listings.css'

import { PlaceContext } from '../../store/context/placeContext';
import React from 'react'
import { UserContext } from '../../store/context/userContext';
import { defaultCardImg } from '../Defaults/defaultImgs';
import { dynamicImgSrc } from '../../utilities/utils';
import { storePlaceDetails } from '../../store/actions/placeActions';
import { truncate } from '../../utilities/utils';
import { useContext } from 'react';
import { useNavigate } from 'react-router'

function ListingCard({id, title, url, address, amenities, latitude, longitude,  bathrooms, bedrooms, beds, type, userId, hostThumbnail, price, description, deeplink, superHost, rating, img, city}) {
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const {userState, userDispatch} = useContext(UserContext)
  const navigate = useNavigate();

  // console.log("userState", userState)
  // console.log("userState.user?.first_name !== ?", userState.user.first_name == "")
  
  const handleClick = () => {
    const data = {id, title, url, address, amenities, latitude, longitude,  bathrooms, bedrooms, beds, type, userId, hostThumbnail, price, description, deeplink, superHost, rating, img, city}

    console.log("data", data)
    storePlaceDetails(data, placeDispatch)
    navigate(`/place/${id}`)
  }


  return (
    <div onClick={() => handleClick()} className="card-listing">
      <div className="heart-badge">
        <svg className="flex-shrink-0 text-red-500 w-9 h-9" height="40px" width="25px" xmlns="http://www.w3.org/2000/svg" fill="rgba(0, 0, 0, 0.5)" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>

      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={img? img[0] : defaultCardImg}
          alt={title}
          loading="lazy"
        />
        {hostThumbnail !== "" && hostThumbnail !== undefined ? 
          <img 
            className="user-badge" 
            style={{width: '45px', borderRadius: '100%'}} 
            src={hostThumbnail} /> :
          <div 
            className="user-badge" 
            style={{width: '43px', borderRadius: '100%',fontWeight: 'bold', fontSize: '16px'}} 
          >
            {userState && userState.user?.first_name && userState.user.first_name !== ""? userState.user.first_name[0] : "T"}
          </div>}
      </div>

      <div className="card-content">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <a href={`/place/${id}`}>
            {/* <h5 className="card-title">{truncate(title, 26)}</h5> */}
            <h5 className="card-title">{truncate(title, 40)}</h5>
          </a>

          <div className='' style={{display: 'flex', margin: '0px'}}>
            <p style={{fontSize: '12px'}}>{rating && rating}</p>
            {rating && rating >= 4 && <img style={{marginLeft:'3px', width: '15px', height: '15px'}} src={dynamicImgSrc('star-24.png')} />}
          </div>
        </div>

        {
          description?.length > 1? 
          <div style={{display: 'flex', marginTop: '3px', alignItems: 'center', minHeight: '38px'}}>
            <p className='address'>{truncate(description, 90)}</p>
          </div>
           :

          <>
          <div style={{display: 'flex', marginTop: '3px', alignItems: 'center'}}>
            <img style={{width: '12px', height: '12px', marginRight: '5px'}} src={dynamicImgSrc('location-pin.png')}/>
            <p className='address'>{address}</p>
          </div>
          <div style={{display: 'flex', marginBottom: '5px', alignItems: 'center'}}>
            <img style={{width: '12px', height: '12px', marginRight: '5px'}} src={dynamicImgSrc('house-48.png')}/>
              <p className='address'>{type}</p>
          </div>
          </>
        }
        <h4 className='price-display'>AU${price}</h4>
      </div>
    </div>

  )
}

export default ListingCard