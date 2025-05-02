export const userReducer = (state, action) => {
  switch (action.type){
    case "ADD_USER_DETAILS":{
      return {
        user: {
          ...action.userInfo,
          auth: true
        }
      }
    }
    case "USER_AUTH":{
      return {
        user: {
          ...state,
          auth: action.authorised
        }
      }
    }
    case "PLACE_RESERVATION":{
      return {
        user: {
          ...state,
          reservations: action.reservation
        }
      }
    }
    
  }
}