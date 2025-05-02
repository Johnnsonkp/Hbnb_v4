import { createContext } from "react";
import { userInitialState } from "../initialState/userInitialState";

export const UserContext = createContext(userInitialState)