const restaurantUserReducer = (state = null, action) => {
  switch (action.type) {
    case "ChangeUser":
      return action.payload;
    default:
      return state;
  }
};

export default restaurantUserReducer;
