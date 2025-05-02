import './listingSkeleton.css'
import './ListingContainer.css'

import React from 'react'

function ListingsSkeleton() {
  const length = [1,2,3,4,5,6,7,8]

  const SkeletonTemp = () => {
    return length && length.map((num, index) => (
      <div key={index} className="card-listing animate-pulse">
        <div className="card-image-wrapper">
          <div className="card-image"></div>
        </div>
        <div className="card-content">
          <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
            <h1 className="card-title-ls"></h1>
            <p className="card-text"></p>
            <p className="card-text"></p>
          </div>

          <p className='address'></p>
          <p className='address'></p>
          <h4 className='price-display'></h4>
        </div>
      </div>
    ))
  }

  return (
    <div className="card-container">
      <div className="card-grid">
        <SkeletonTemp />
      </div>
    </div>
  )
}

export default ListingsSkeleton