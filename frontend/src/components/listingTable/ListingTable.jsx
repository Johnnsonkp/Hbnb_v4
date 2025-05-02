import './listingTable.css'

import { useContext, useEffect } from 'react'

import { PlaceContext } from '../../store/context/placeContext';
import React from 'react'
import { UserContext } from '../../store/context/userContext';
import { parsedPlaces } from '../../utilities/placeUtilities';
import { shuffleArray } from '../../utilities/placeUtilities';
import { storePlaces } from '../../store/actions/placeActions';

function ListingTable({placeState}) {
  // const {placeState, placeDispatch} = useContext(PlaceContext);
  const {userState, userDispatch} = useContext(UserContext);

  console.log("userState?.user?.id", userState?.user?.id)
  console.log("uuserState", userState)  

  const DefaultTable = () => {
    return (
      <table className="product-table">
        <thead>
          <tr>
              <th className="table-header">Title</th>
              <th className="table-header">Price</th>
              <th className="table-header">Address</th>
              <th className="table-header">Property type</th>
              <th className="table-header">Total</th>
          </tr>
        </thead>
      </table>
    )
  }

  return (
    <>
    <DefaultTable />
    <div className="overflow-container">
      {placeState && placeState?.placeListings && placeState?.placeListings.map((listing, index) => (
        listing?.img && listing?.img[0] && listing?.userId == userState?.user?.id &&
        
        <div className="table-body">
          <img src={listing?.img[0] || listing?.images[0]} alt={listing?.title} />

          <div style={{textAlign: 'left', display: 'flex', flexDirection: 'row', flex: "0.78", alignItems: 'center'}}>

            <div>
              <p className="">{listing?.title}{index}<br/></p>
              <span className="">{listing?.address}</span>
            </div>
            
            <span className="">{- listing?.rating}</span>
            <div className="">${listing?.price}</div>
            <div className="">{listing?.address}</div>
            <div className="">{listing?.property_type || listing?.type }</div>
            <div className="">$1,500</div>
          </div>
        </div>
        
      ))}
    </div>
    </>
  )
}

export default ListingTable