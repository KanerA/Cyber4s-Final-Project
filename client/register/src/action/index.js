export const changeRestaurant = (restaurant) => {
  return {
    type: "ChangeRestaurant",
    payload: restaurant,
  };
};

export const changeRestaurantUser = (restaurantUser) => {
  return {
    type: "ChangeUser",
    payload: restaurantUser,
  };
};
