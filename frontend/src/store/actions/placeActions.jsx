export const storePlaces = (data, dispatch) => {
  console.log("data dispatched", data)
  dispatch({type: "LOAD_ALL_PLACES", listings: data})
}

export const storePlaceDetails = (data, dispatch) => {
  console.log("dispatch", data)
  dispatch({type: "SINGLE_PLACE_DETAILS", placeDetails: data})
}