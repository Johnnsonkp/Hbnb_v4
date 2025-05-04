import './buttonslide.css'

import { useContext, useState } from 'react'

import LoadSpinner from '../../loading/LoadSpinner'
import { PlaceContext } from '../../../store/context/placeContext'
import React from 'react'
import { UserContext } from '../../../store/context/userContext'
import { useNavigate } from 'react-router'

function ButtonSlide({titles, onClick, activeTab, handleSubmit}) {

  const {userState, userDispatch} = useContext(UserContext)
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const [ownerID, setOwnerID] = useState(userState?.user?.id)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  let testThumbnail = "https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_t=R&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"

  function transformPlace(place, owner_id) {
    return {
      title: place.title.slice(0, 90),
      latitude: place.latitude || 0,
      longitude: place.longitude || 0,
      description: place.description,
      price: place.price || 100,
      owner_id: ownerID,
      url: place.url,
      deeplink: place.deeplink,
      bathrooms: place.bathrooms || 1,
      bedrooms: place.bedrooms || 1,
      beds: place.beds || 1,
      city: place.city,
      images: place.img,
      host_thumbnail: place.hostThumbnail,
      super_host: place.superHost || false,
      rating: place.rating || 5,
      property_type: place.type,
      address: place.address,
    };
  }

  const parsedData_2 = async (place) => {
    const formData = new FormData();

    formData.append('title', place.title.slice(0, 90));
    formData.append('address', place.address);
    formData.append('description', place.description || "");
    formData.append('price', place.price);
    formData.append('bathrooms', place.bathrooms);
    formData.append('bedrooms', place.bedrooms);
    formData.append('beds', place.beds);
    formData.append('city', place.city);
    formData.append('property_type', place.type);
    formData.append('latitude', place.latitude || 0);
    formData.append('longitude', place.longitude || 0);
    formData.append('owner_id', userState?.user?.id);
    formData.append('url', place.url || '');
    formData.append('deeplink', place.deeplink || '');
    formData.append('host_thumbnail', place.hostThumbnail || testThumbnail);
    formData.append('rating', place.rating || 0);
    formData.append('super_host', false);

    // Append each file separately
    place.img.forEach((file, index) => {
      formData.append('images', file);
    });

    try {
      console.log("formData", formData)

      const response = await fetch(`https://hbnbv4-production.up.railway.app/api/v1/places`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: formData, 
      });

      const data = await response.json();
      console.log("Listing created", data);
    } catch (error) {
      console.error('Error posting listing:', error);
    }
  }


  const ids = [
    "794958ab-1bbc-4994-bc6f-1fdd58494edc",
    "19d4e651-925b-49bc-93a7-b995ec432adb",
    "29610146-0129-420b-a9eb-5dfaa1146a34",
    "36c9050e-ddd3-4c3b-9731-9f487208bbc1",
    "644caa11-aeb8-4fcd-8b5d-1194febea684"
  ]

  const handleListingCreation = async () =>  {

    console.log("userState userState?.user?.id", userState?.user?.id);

    const getListings = async () => {
      try {
        // const response = await fetch(`${window.location.origin}/api/v1/places`, {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/places`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors',
          // credentials: 'include',
        });
        const data = await response.json();
        return data

      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };

    const postListing = async ({data}) => {
      console.log("postListing", data)
        try {
          const response = await fetch('http://127.0.0.1:5000/api/v1/places', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({data})
          });
          const data = await response.json();
          return data

        } catch (error) {
          console.error('Failed to fetch listings:', error);
        }
    }

    const formData = {
      "title": "Low-cost bed for backpackers - Bed 3",
      "latitude": -37.95826,
      "longitude": 145.17344,
      "description": "Low-cost bed for backpackers - Bed 3",
      "price": 675,
      "owner_id": ownerID,
      "super_host": false,
      "rating": 4.9,
      "property_type": "Shared room in home",
      "address": "Noble Park, VIC, Australia",
      "bathrooms": 1,
      "bedrooms": 1,
      "beds": 4,
      "city": "Noble Park",
      "url": "https://www.airbnb.com/rooms/1112096410911934151",
      "host_thumbnail": "https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_t=R&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff",
      "deeplink": "https://www.airbnb.com/rooms/1112096410911934151?check_in=2025-09-12&check_out=2025-10-13&adults=1&children=0&infants=0&pets=0",
      "images": [
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/f58faaf1-bfc6-4d0b-9279-abed0e737203.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/dd679803-58b4-4e9b-a722-c90bd7f6903e.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/c40f821a-7a39-43f2-b973-d65edf6a0ea8.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/a805c1f9-630c-4178-873f-022774d23606.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/f8fe4335-f73a-4d19-88be-55fa97dad145.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/1c84e59c-ee4b-4b03-8a40-c2de7b728191.jpeg?im_w=720"
      ]
    }
    
    if(formData){
      const postListing = async (parsedPlace) => {
        console.log(`post listing: ${window.location.origin}` )
        console.log(`post listing parsedPlace: ${JSON.stringify(parsedPlace)}` )

        try {
          // const response = await fetch(`${window.location.origin}/api/v1/places`, {
          const response = await fetch("https://hbnbv4-production.up.railway.app/api/v1/places", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(parsedPlace)
          });
          const data = await response.json();
          return data

        } catch (error) {
          console.error('Failed to fetch listings:', error);
        }
      };

      let randomNumber = Math.floor(Math.random() * 5);
      console.log(randomNumber);

      // for (let i = 0; i < placeState.placeListings.length; i++) {
      for (let i = 0; i < 1; i++) {
        const place = placeState.placeListings[randomNumber];

        // if (!data.some(listing => listing.title === place.title) && place.latitude !== undefined) {
        console.log("place.title", place.title);
        console.log("place", place);
        
        if( place.type !== undefined){ 
          
          place.description == null? (place.description = place.title) : place.description
          // const parsedPlace = transformPlace(place, ids[randomNumber])
          // console.log("parsedPlace", parsedPlace);
          
          // postListing(parsedPlace).then((d) => console.log("then posted place", d))
          parsedData_2(place).then((d) => console.log("then posted place", d))
          console.log("index", i);
          break;
        }
      }

    }
  }

  const initiateListingCreation = () => {
    setLoading(true)

    handleSubmit()
    .then(() => {
      setLoading(false)
      navigate("/hosting")
    })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}} className='tab-container'>
      <div className={"button-slide-container"} style={{transform: "scale(0.8)"}}>
        {titles && titles.map((title, index) => (
          <div className='tab' key={index}>
            <button 
              onClick={onClick} 
              className={activeTab == index || activeTab == title? `active-slidebtn` : 'slidebtn'}
              >
              {title}
            </button>
            <span className={activeTab == index || activeTab == title? `${index == 0? "glider transition-1" : index == 1? "glider transition-2" : "glider transition-3"}` : ""}></span>
          </div>
        ))}
      </div>
      <button style={{height: '40px', fontSize: '14px'}} onClick={() => handleListingCreation()}>Post to databse</button>
      
      <button 
        style={{height: '40px', fontSize: '14px', minWidth: '90px'}} 
        onClick={() => initiateListingCreation()}
      >
        {loading? <LoadSpinner /> : "Create place"}
      </button>
    </div>
  )
}

export default ButtonSlide