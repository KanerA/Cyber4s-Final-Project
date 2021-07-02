import restaurantReducer from "./restaurant";
import restaurantUserReducer from "./restaurantUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  restaurant: restaurantReducer,
  restaurantUser: restaurantUserReducer,
});

export default allReducers;
