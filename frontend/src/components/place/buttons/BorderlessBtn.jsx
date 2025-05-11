import React from 'react'

function BorderlessBtn({title, onClick}) {
  return (
    <button 
      style={{background: 'transparent', border: 'none', color: '#333', position: 'relative', top: '70px', left: '-0px', textAlign: 'left', width: '95%', margin: 'auto', cursor: 'point', marginTop: '10px', marginBottom: '38px', padding: '0px', display: 'flex', alignItems: 'center', fontSize: '14px'}}
      onClick={onClick}
    >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="20px">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
            </path>
        </svg>
      {title}
    </button>
  )
}

export default BorderlessBtn