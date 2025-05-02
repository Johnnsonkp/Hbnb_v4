export const storeUserData = (data, dispatch) => {
  dispatch({type: "ADD_USER_DETAILS", userInfo: data})
  // dispatch({type: "AUTH_USER", authorised: true})
}

export const placeBooking = (data, dispatch) => {
  dispatch({type: "PLACE_RESERVATION", reservation: data})
}