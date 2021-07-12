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
    let itemOptionsPrice = 0;
    item.options?.map((option) => {
      itemOptionsPrice += Number(option.price);
    });
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
        let itemOptionsPrice = 0;
        orderedDish.options?.map((option) => {
          itemOptionsPrice += Number(option.price);
        });
        return (
          <div className="item-props" key={`dishOrder ${i}`}>
            <p>
              {orderedDish.amount}X {orderedDish.name}(
              <span className="item-price">{orderedDish.price}</span>)
            </p>
            <p>{orderedDish.notes}</p>
            {orderedDish.options?.map((option) => {
              return (
                <p>
                  <span>{option.name}</span>
                  {Number(option.price) > 0 && (
                    <span className="item-price small">{option.price}</span>
                  )}
                </p>
              );
            })}
            <p className="item-price">
              Total: {orderedDish.amount * orderedDish.price + itemOptionsPrice}
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
      {drinkOrders?.map((orderedDrink, i) => {
        let itemOptionsPrice = 0;
        orderedDrink.options?.map((option) => {
          itemOptionsPrice += Number(option.price);
        });
        return (
          <div className="item-props" key={`drinkOrder ${i}`}>
            <p>
              {orderedDrink.amount}X {orderedDrink.name} (
              <span className="item-price">{orderedDrink.price}</span>)
            </p>
            <p className="order-notes">{orderedDrink.notes}</p>
            {orderedDrink.options?.map((option) => {
              return (
                <p>
                  {option.name}
                  {option.price > 0 && (
                    <span className="item-price small">{option.price}</span>
                  )}
                </p>
              );
            })}

            <p className="item-price">
              Total:{" "}
              {orderedDrink.amount * orderedDrink.price + itemOptionsPrice}
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
