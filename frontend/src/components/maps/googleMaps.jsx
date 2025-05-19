import {APIProvider, Map} from '@vis.gl/react-google-maps';

import React from 'react';

const GoogleMaps = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider apiKey={'AIzaSyBEIQfRWV0wuQCfLqTYjGoA_y9iM5HgoqU'} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
            defaultZoom={13}
            defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
            onCameraChanged={ (ev) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }>
        </Map>
      </APIProvider>
    </div>
  )
};

export default GoogleMaps