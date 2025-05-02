import './listingContainer.css'

import ListingCard from './ListingCard'
import React from 'react'

function ListingContainer({listings}) {
  return (
    <div className="card-container">
      <div className="card-grid">
      {listings && (
        listings.map((listing, index) => (
          <ListingCard 
            key={index}
            id={listing.id}
            title={listing.title}
            url={listing.url}
            address={listing.address}
            amenities={listing.amenities}
            latitude={listing.latitude}
            longitude={listing.longitude}
            city={listing.city}
            price={listing?.price?.rate || listing?.price || ''}
            description={listing.description}
            img={listing.img}
            bathrooms={listing.bathrooms || ''}
            bedrooms={listing.bedrooms || ''}
            beds={listing.beds || ''}
            type={listing.type}
            userId={listing.userId || ''}
            hostThumbnail={listing.hostThumbnail}
            deeplink={listing.deeplink || ''}
            superHost={listing.superHost}
            rating={listing.rating || ''}
          />
        ))
      )}
      </div>
    </div>
  )
}

export default ListingContainer