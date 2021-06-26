const change = (restaurant) => {
  return {
    type: "Change",
    payload: restaurant,
  };
};

export default change;
