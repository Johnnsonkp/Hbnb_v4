import React, {useState} from 'react'
import { useContext, useEffect } from 'react'

import LargeImage from './LargeImage'
import Layout from './Layout'
import { PlaceContext } from '../../store/context/placeContext'
import SingleImage from './SingleImage'
import { parsedPlace } from '../../utilities/placeUtilities'
import { storePlaceDetails } from '../../store/actions/placeActions'
import { useNavigate } from 'react-router'

const PlaceImageLayout = () => {
  const {placeState, placeDispatch} = useContext(PlaceContext)
  const [placeData, setPlaceData] = useState()
  const [pageRefresh, setPageRefresh] = useState(true)
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND
  const API = import.meta.env.VITE_API_PATH
  const places_path = import.meta.env.VITE_PLACES_PATH

  const customStyles = {
    pageWrapper: {
      padding: "1rem",
      paddingBottom: '0px'
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0.3rem 1rem"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginTop: "0.2rem",
      marginBottom: "0.1rem",
      textAlign: 'left'
    }
  }

  const getSinglePlaceById = async (placeID) => {
    console.log("getSinglePlaceById placeid", placeID)
    console.log(`url: ${BASE_URL}/${API}/${places_path}/${placeID}`)
  
    try {
      const response = await fetch(`${BASE_URL}/${API}/${places_path}/${placeID}`, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        // credentials: 'include',
      });
      const data = await response.json();
      return parsedPlace(data[0])
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  const getIdFromUrl = () => {
    const pathParts = window.location.pathname.split('/');
    const placeId = pathParts[pathParts.length - 1];

    return placeId;
  }

  useEffect(() => {    
    let placeID = getIdFromUrl()

    if(placeState?.placeDetails?.title){
      setPlaceData(placeState?.placeDetails)
    }

    if(!placeState?.placeDetails?.title && placeID && pageRefresh){
      getSinglePlaceById(placeID)
        .then((data) => {
          console.log("data", data)
          if(data == undefined){
            navigate('/listings')
          }
          storePlaceDetails(data, placeDispatch)
          setPlaceData(data)
        })
        
      setPageRefresh(false)
      return
    }
    if (!placeID){
      navigate('/listings')
    }
  }, [getSinglePlaceById, placeData])


    return (
      <Layout customStyles={customStyles} title={placeData? placeData?.title : ''}>
        <LargeImage img={placeData? placeData?.img[0] : null} alt={placeData? placeData?.title : ''}/>
        <SingleImage img={placeData? placeData?.img[1] : null} alt={placeData? placeData?.title : ''}/>
        <SingleImage img={placeData? placeData?.img[2] : null} alt={placeData? placeData?.title : ''}/>
        <SingleImage img={placeData? placeData?.img[3] : null} alt={placeData? placeData?.title : ''}/>
        <SingleImage img={placeData? placeData?.img[4] : null} alt={placeData? placeData?.title : ''}/>
      </Layout> 
    )
}

export default PlaceImageLayout