import { UserContext } from "./context/userContext";
import { useReducer } from "react";
import { userInitialState } from "./initialState/userInitialState";
import { userReducer } from "./reducer/userReducer";

export const UserProvider = ({children}) => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);

  return(
    <UserContext.Provider value={{userState, userDispatch}}>
      {children}
    </UserContext.Provider>
  )
}