import restaurantReducer from "./restaurant";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  restaurant: restaurantReducer,
});

export default allReducers;
