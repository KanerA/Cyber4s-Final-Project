import React from "react";

export default function Order({ order }) {
  const cancelOrder = (e) => {
    // patch {cancel: true}
  };
  return (
    <div>
      <h2> {order.customerName}</h2>
      <div>
        {order.dish?.map((dish) => {
          return (
            <div>
              <p>{dish.name}</p>
              <p>{dish.description}</p>
              <p>{dish.price}</p>
            </div>
          );
        })}
      </div>
      <div>
        {order.drink?.map((drink) => {
          return (
            <div>
              <p>{drink.name}</p>
              <p>{drink.description}</p>
              <p>{drink.price}</p>
              <p>{drink.alcoholic}</p>
            </div>
          );
        })}
      </div>
      <p>{order.createdAt}</p>
    </div>
  );
}
// customerName: body.customerName,
// dish: body.dish,
// drink: body.drink,
