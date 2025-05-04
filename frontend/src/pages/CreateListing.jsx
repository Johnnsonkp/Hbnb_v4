import React, {useContext, useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router'

import ButtonSlide from '../components/buttons/buttonSlide/ButtonSlide'
import LargeImage from '../components/imageLayout/LargeImage'
import Layout from '../components/imageLayout/Layout'
import PlaceBodyDetails from '../components/place/placebody/PlaceBodyDetails'
import SingleImage from '../components/imageLayout/SingleImage'
import Step1Form from '../components/form/createlisting/step1Form'
import Step2Form from '../components/form/createlisting/Step2Form'
import Step3Form from '../components/form/createlisting/Step3Form'
import { UserContext } from '../store/context/userContext'
import { dynamicImgSrc } from '../utilities/utils'

function CreateListing() {
  const [activeTab, setActiveTab] = useState(0)
  const [category, setCategory] = useState()
  const [address, setAddress] = useState()
  const [price, setPrice] = useState(0)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [amenities, setAmenities] = useState([])
  const [city, setCity] = useState()
  const [files, setFiles] = useState([])
  const [filesURL, setFilesURL] = useState([])
  const location = useLocation();
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('access_token');
  const titles = ["Step 1: About your place", "Step 2: Fine details", "Step 3: Place overview"]
  const {userState, userDispatch} = useContext(UserContext)
  
  const [placeDetails, setPlaceDetails] = useState({
    bedrooms: 0,
    beds: 0,
    bathrooms: 0
  })
  const handleClick = (e) => {
    setActiveTab(e.target.innerText)
  }

  const customStyles = {
    pageWrapper: {
      padding: '0px',
      transform: 'scale(0.96)',
      paddingBottom: '0px'
    },
    container: {
      padding: "0.1rem 1rem"
    },
    bodyStyles: {
      maxWidth: "1280px", 
      paddingLeft: '0.6rem', 
      paddingRight: '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
    },
    placeDisplay: {
      border: '1px solid lightGray', 
      height: '650px', 
      borderRadius: '8px', 
      alignItems: 'flex-start', 
      padding: '0px',
      flex: '0.6',
      marginTop: '10px',
      zIndex: 9999999,
      opacity: "0.7",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)"
    },
    customHeight: {
      height: '350px'
    },
    customHeightSmall: {
      height: '170px'
    }
  }
  const ids = [
    "794958ab-1bbc-4994-bc6f-1fdd58494edc",
    "19d4e651-925b-49bc-93a7-b995ec432adb",
    "29610146-0129-420b-a9eb-5dfaa1146a34",
    "36c9050e-ddd3-4c3b-9731-9f487208bbc1",
    "644caa11-aeb8-4fcd-8b5d-1194febea684"
  ]
  let randomNumber = Math.floor(Math.random() * 5);
  let ownerID = ids[randomNumber]

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

  const test_imgs = [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/f58faaf1-bfc6-4d0b-9279-abed0e737203.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/dd679803-58b4-4e9b-a722-c90bd7f6903e.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/c40f821a-7a39-43f2-b973-d65edf6a0ea8.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/a805c1f9-630c-4178-873f-022774d23606.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/f8fe4335-f73a-4d19-88be-55fa97dad145.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1112096410911934151/original/1c84e59c-ee4b-4b03-8a40-c2de7b728191.jpeg?im_w=720"
  ]
  
  const postListing = async (parsedPlace) => {
    console.log("accessToken", accessToken)
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/places', {
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

  let testThumbnail = "https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_t=R&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"

  function transformPlace(place, owner_id) {
    return {
      title: place.title || '',
      address: place.address || '',
      description: place.description || '',
      price: Number(place.price) || 0,
      bathrooms: place.bathrooms || 0,
      bedrooms: place.bedrooms || 0,
      beds: place.beds || 1,
      city: place.city || '',
      property_type: place.category || '',
      latitude: place.latitude || -37.95826,
      longitude: place.longitude || 145.17344,
      owner_id: place.owner_id || owner_id || ownerID || '',
      url: place.url || '',
      deeplink: place.deeplink || '',
      images: place.images,
      host_thumbnail: place.hostThumbnail || testThumbnail,
      super_host: false,
      rating: place.rating || 5,
    };
  }

  const handleSubmit = async () => {
    if (files.length) {
      const formData = new FormData();
  
      formData.append('title', title);
      formData.append('address', address);
      formData.append('description', description);
      formData.append('price', Number(price));
      formData.append('bathrooms', placeDetails.bathrooms);
      formData.append('bedrooms', placeDetails.bedrooms);
      formData.append('beds', placeDetails.beds);
      formData.append('city', city);
      formData.append('property_type', category);
      formData.append('latitude', Number(-37.95826,));
      formData.append('longitude', Number(145.17344));
      formData.append('owner_id', userState?.user?.id);
      formData.append('url', '');
      formData.append('deeplink', '');
      // formData.append('host_thumbnail', testThumbnail);
      formData.append('host_thumbnail', '');
      formData.append('rating', 5);
      formData.append('super_host', false);
  
      // Append each file separately
      files.forEach((file, index) => {
        formData.append('images', file);
      });
  
      try {
        // const response = await fetch('http://127.0.0.1:5000/api/v1/places', {
        const response = await fetch(`${window.location.origin}/api/v1/places`, {
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
  
        // Reset form
        setCategory("");
        setAddress("");
        setPrice(0);
        setPrice("");
        setDescription("");
        setAmenities([]);
        setCity("");

        // navigate("/hosting")
      } catch (error) {
        console.error('Error posting listing:', error);
      }
    }
  }
  
  console.log("files", files)
  console.log("filesURL", filesURL)
  console.log("userState id:", userState?.user?.id)
  
  return (
    <div className='page-content'>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px'}}>
        <ButtonSlide 
          titles={titles}
          activeTab={activeTab}
          onClick={(e) => handleClick(e)}
          handleSubmit={handleSubmit}
        />
        <button style={{background: 'transparent', color: '#333', border: 'none', padding: '0px', display: 'flex', alignItems: 'center', fontSize: '14px'}} 
          onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="20px">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
              </path>
          </svg>
          Back to dashboard
        </button>
      </div>


      <div style={{display: 'flex'}}>
        <div style={{flex: '0.4'}}>
          {activeTab == titles[0] || activeTab == 0? 
            <Step1Form 
              setCategory={setCategory} 
              placeDetails={placeDetails} 
              setPlaceDetails={setPlaceDetails} 
              address={address} 
              setAddress={setAddress}
              city={city}
              setCity={setCity} /> : 
          activeTab == titles[1]? 
            <Step2Form 
              description={description} 
              setDescription={setDescription} 
              amenities={amenities} 
              setAmenities={setAmenities} 
              title={title} 
              setTitle={setTitle} 
              setPrice={setPrice} 
              price={price}
              files={files}
              setFiles={setFiles}
              setFilesURL={setFilesURL}
              /> : 
            <Step3Form 
              placeDetails={placeDetails} 
              category={category} 
              address={address} 
              description={description} 
              amenities={amenities} 
              title={title} 
              price={price}/>} 
        </div>

        <div style={customStyles.placeDisplay}>
          <Layout title={title || "New listing"} customStyles={customStyles}>
            <LargeImage img={filesURL && filesURL[0] || dynamicImgSrc('empty-img.jpg')} alt={"test"} customHeight={customStyles.customHeight} />
            <SingleImage img={filesURL && filesURL[1] || dynamicImgSrc('empty-img.jpg')} alt={"test"} customHeight={customStyles.customHeightSmall}/>
            <SingleImage img={filesURL && filesURL[2] || dynamicImgSrc('empty-img.jpg')} alt={"test"} customHeight={customStyles.customHeightSmall}/>
            <SingleImage img={filesURL && filesURL[3] || dynamicImgSrc('empty-img.jpg')} alt={"test"} customHeight={customStyles.customHeightSmall}/>
            <SingleImage img={filesURL && filesURL[4] || dynamicImgSrc('empty-img.jpg')} alt={"test"} customHeight={customStyles.customHeightSmall}/>
          </Layout>

          <div style={{padding: '10px', marginLeft: '10px'}}>
            <PlaceBodyDetails 
              bookBtn={"hide"} 
              customStyles={customStyles.bodyStyles} 
              customType={category} 
              customPlaceDetails={placeDetails} 
              customAddress={address}/>
            
            <div style={{display: 'flex', marginTop: '10px', marginLeft: '10px'}}>
              <h5>Amenities:</h5>
              {amenities?.length ? amenities.map((item) => (
                <button style={{fontSize: '0.7rem', padding: '5px', marginLeft: '2px'}}>{item}</button>
              )) : ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateListing