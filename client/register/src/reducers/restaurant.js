const restaurantReducer = (state = null, action) => {
  switch (action.type) {
    case "ChangeRestaurant":
      return action.payload;
    default:
      return state;
  }
};

export default restaurantReducer;
