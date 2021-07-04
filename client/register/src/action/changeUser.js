const changeRestaurantUser = (restaurantUser) => {
  return {
    type: "ChangeUser",
    payload: restaurantUser,
  };
};

export default changeRestaurantUser;
