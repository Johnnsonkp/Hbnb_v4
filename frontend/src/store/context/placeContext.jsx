import { createContext } from "react";
import { placeInitialState } from "../initialState/placeInitialState";

export const PlaceContext = createContext(placeInitialState);