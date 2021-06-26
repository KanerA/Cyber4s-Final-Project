export const changeRestaurant = (restaurant) => {
  return {
    type: "Change",
    payload: restaurant,
  };
};
