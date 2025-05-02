import "./imageLayout.css"

import React from 'react'

function LargeImage({alt, img, customHeight}) {
  return (
    <div className="layout-grid-item large" style={customHeight}>
      <img src={img} alt={alt} />
      <div className="overlay">
        <div className="overlay-content">
          <h3>{alt}</h3>
          {/* <p>Discover the beauty of the natural world</p> */}
        </div>
      </div>
    </div>
  )
}

export default LargeImage