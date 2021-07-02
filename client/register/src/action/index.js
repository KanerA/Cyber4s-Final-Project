export const changeRestaurant = (restaurant) => {
  return {
    type: "Change",
    payload: restaurant,
  };
};

export const changeRestaurantUser = (restaurantUser) => {
  return {
    type: "Change",
    payload: restaurantUser,
  };
};
