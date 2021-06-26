import React from "react";

function CurrentOrder({ dishOrders, drinkOrders }) {
  return (
    <div>
      {dishOrders.map((orderedDish) => {
        return (
          <div>
            <p>
              {orderedDish.amount}X {orderedDish.name}
            </p>
            <p>{orderedDish.notes}</p>
            <p>{orderedDish.amount * orderedDish.price}</p>
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
          </div>
        );
      })}
    </div>
  );
}

export default CurrentOrder;
