import React from 'react'

function BorderlessBtn({title, onClick}) {
  return (
    <button 
      style={{background: 'transparent', border: 'none', color: '#333', position: 'relative', top: '70px', left: '-0px', textAlign: 'left', width: '95%', margin: 'auto', cursor: 'point', marginTop: '30px'}}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default BorderlessBtn