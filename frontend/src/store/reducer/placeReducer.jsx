export const placeReducer = (state, action) => {
  switch (action.type){
    case "LOAD_ALL_PLACES":{
      return {
        ...state,
        placeListings: action.listings
      }
    }
    case "SINGLE_PLACE_DETAILS":{
      return {
        ...state,
        placeDetails: action.placeDetails
      }
    }
    
  }
}