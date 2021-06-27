import React from "react";

function CurrentOrder({
  dishOrders,
  setDishOrders,
  setDrinkOrders,
  drinkOrders,
  totalPrice,
  setTotalPrice,
}) {
  const cancelItem = (itemBool, item) => {
    if (itemBool) {
      const newDishes = dishOrders.filter((dish) => dish.name !== item.name);
      setDishOrders(newDishes);
    } else {
      const newDrinks = drinkOrders.filter((drink) => drink.name !== item.name);
      setDrinkOrders(newDrinks);
    }
    const newPrice = totalPrice - item.price * item.amount;
    setTotalPrice(newPrice);
  };
  return (
    <div className="item">
      {dishOrders.map((orderedDish) => {
        return (
          <div>
            <p>
              {orderedDish.amount}X {orderedDish.name}
            </p>
            <p>{orderedDish.notes}</p>
            <p>{orderedDish.amount * orderedDish.price}</p>
            <button onClick={() => cancelItem(true, orderedDish)}>
              cancel dish
            </button>
          </div>
        );
      })}
      {drinkOrders.map((orderedDrink) => {
        return (
          <div>
            <p>
              {orderedDrink.amount}X {orderedDrink.name}
            </p>
            <p>{orderedDrink.notes}</p>
            <p>{orderedDrink.amount * orderedDrink.price}</p>
            <button onClick={() => cancelItem(false, orderedDrink)}>
              cancel drink
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentOrder;
