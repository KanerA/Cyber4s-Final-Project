const changeRestaurant = (restaurant) => {
  return {
    type: "ChangeRestaurant",
    payload: restaurant,
  };
};

export default changeRestaurant;
