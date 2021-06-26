import React, { useState } from "react";
import axios from "axios";

export default function Order({ order }) {
  const [canceled, setCanceled] = useState(order.canceled);
  const cancelOrder = (e) => {
    // patch {cancel: true}
    axios
      .patch(`/orders/done/?c=true&id=${order.customerName}`)
      .then((res) => setCanceled(res.data.canceled));
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
      <p>cancel:{canceled ? "true" : "false"}</p>
      <p>done:{order.done ? "true" : "false"}</p>
      <button
        onClick={() => {
          cancelOrder();
        }}
      >
        cancel
      </button>
    </div>
  );
}
// customerName: body.customerName,
// dish: body.dish,
// drink: body.drink,
