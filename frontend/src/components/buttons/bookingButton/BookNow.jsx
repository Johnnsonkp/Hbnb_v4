import './bookNow.css'

import React from 'react'

function BookNow({cta, func, loading}) {
  return (
    <button onClick={() => func()} style={{width: '450px'}}>{loading?

      <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="spinner-fg" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg> : cta}
    
    </button>
  )
}

export default BookNow