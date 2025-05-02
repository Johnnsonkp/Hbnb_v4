import React from 'react'

function Step3Form({placeDetails, category, address, description, amenities, title, price}) {
  return (
    <div style={{marginTop: '30px'}}>
      <h2 style={{textAlign: 'left'}}>Step 3: Overview</h2>
      <hr></hr>
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{marginRight: '10px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing name:</h4>
              <input style={{width: '300px', borderRadius: '8px'}} value={title}></input>
            </div>

            <div>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing price:</h4>
              <input style={{width: '120px'}} type="number" placeholder="Price" className="input-field" value={price}/>
            </div>
          </div>

          <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing description:</h4>
            <textarea style={{width: '400px', borderRadius: '8px'}} value={description} readOnly></textarea>
          </div>

          <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '10px', display: 'flex'}}>
            <div style={{marginRight: '10px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Listing address:</h4>
              <input style={{width: '250px', borderRadius: '8px'}} value={address} readOnly></input>
            </div>
            <div>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Property type:</h4>
              <input style={{width: '180px', borderRadius: '8px'}} value={category} readOnly></input>
            </div>
          </div>

          <div style={{textAlign: 'left', marginTop: '10px', marginLeft: '10px', display: 'flex'}}>
            <div style={{margin: '5px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Bedrooms:</h4>
              <input style={{width: '70px', borderRadius: '8px'}} value={placeDetails.bedrooms} readOnly></input>
            </div>

            <div style={{margin: '5px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Bathrooms:</h4>
              <input style={{width: '70px', borderRadius: '8px'}} value={placeDetails.bathrooms} readOnly></input>
            </div>

            <div style={{margin: '5px'}}>
              <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Beds:</h4>
              <input style={{width: '70px', borderRadius: '8px'}} value={placeDetails.beds} readOnly></input>
            </div>
          </div>

          <div style={{textAlign: 'left', marginTop: '5px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Amenities:</h4>
            {Object.entries(amenities).map((k, index) => {
                return <button key={index} style={{fontSize: '13px' }}>{k[1]}</button>
            })}
          </div>

          <div style={{textAlign: 'left', marginTop: '20px', marginLeft: '10px'}}>
            <h4 style={{marginBottom: '8px', fontWeight: '500'}}>Attach photos (5 minimun):</h4>                
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Step3Form
