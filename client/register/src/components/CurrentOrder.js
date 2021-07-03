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
      const newDishes = dishOrders.filter((dish) => dish.count !== item.count);
      setDishOrders(newDishes);
    } else {
      const newDrinks = drinkOrders.filter(
        (drink) => drink.count !== item.count
      );
      setDrinkOrders(newDrinks);
    }
    const newPrice = totalPrice - item.price * item.amount;
    setTotalPrice(newPrice);
  };
  return (
    <div className="item">
      {dishOrders.map((orderedDish, i) => {
        return (
          <div className="item-props" key={`dishOrder ${i}`}>
            <p>
              {orderedDish.amount}X {orderedDish.name}
            </p>
            <p>{orderedDish.notes}</p>
            <p className="item-price">
              Total: {orderedDish.amount * orderedDish.price}
            </p>
            <button
              className="cancel"
              onClick={() => cancelItem(true, orderedDish)}
            >
              cancel dish
            </button>
          </div>
        );
      })}
      {drinkOrders.map((orderedDrink, i) => {
        return (
          <div className="item-props" key={`drinkOrder ${i}`}>
            <p>
              {orderedDrink.amount}X {orderedDrink.name}
            </p>
            <p>{orderedDrink.notes}</p>
            <p className="item-price">
              Total: {orderedDrink.amount * orderedDrink.price}
            </p>
            <button
              className="cancel"
              onClick={() => cancelItem(false, orderedDrink)}
            >
              cancel drink
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentOrder;
