const restaurantReducer = (state = null, action) => {
  switch (action.type) {
    case "Change":
      return action.payload;
    default:
      return state;
  }
};

export default restaurantReducer;
