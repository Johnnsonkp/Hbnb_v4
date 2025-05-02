import BorderlessBtn from '../components/place/buttons/BorderlessBtn'
import LargeImage from '../components/imageLayout/LargeImage'
import Layout from '../components/imageLayout/Layout'
import PlaceBodyDetails from '../components/place/placebody/PlaceBodyDetails'
import { PlaceContext } from '../store/context/placeContext'
import PlaceImageLayout from '../components/imageLayout/placeImageLayout'
import React from 'react'
import SingleImage from '../components/imageLayout/SingleImage'
import { UserContext } from '../store/context/userContext'
import { placeBooking } from '../store/actions/userActions'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

function PlaceDetails() {
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const {userState, userDispatch} = useContext(UserContext)
  const navigate = useNavigate();

  const handleBooking = () => {
    // if(!userState?.user?.auth || !placeState?.placeDetails){
    //   navigate('/auth/login')
    // }

    placeBooking(placeState.placeDetails, userDispatch)
    navigate('/trips')
  }

  return (
    <div className='page-content'>
      <BorderlessBtn 
        title={""}
        onClick={() => navigate(-1)}
      />
      <PlaceImageLayout />
      <PlaceBodyDetails handleBooking={handleBooking}/>
    </div>
  )
}

export default PlaceDetails