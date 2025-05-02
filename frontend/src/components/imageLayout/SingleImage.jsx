import React from 'react'

function SingleImage({alt, img, customHeight}) {
  return (
    <div className="layout-grid-item" style={customHeight}>
      <img style={{objectFit: 'cover', height: '13rem', maxHeight: '13rem'}} src={img} alt={alt} />
      <div className="overlay">
        <div className="overlay-content">
        </div>
      </div>
    </div>
  )
}

export default SingleImage