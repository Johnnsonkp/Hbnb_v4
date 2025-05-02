import { PlaceContext } from "./context/placeContext";
import { placeInitialState } from "./initialState/placeInitialState";
import { placeReducer } from "./reducer/placeReducer";
import { useReducer } from "react";

export const PlaceProvider = ({children}) => {
  const [placeState, placeDispatch] = useReducer(placeReducer, placeInitialState);

  return (
    <PlaceContext.Provider value={{placeState, placeDispatch}}>
      {children}
    </PlaceContext.Provider>
  )
}
