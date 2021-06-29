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
      <h2 className="name"> {order.customerName}</h2>
      <div>
        {order.dish?.map((dish) => {
          return (
            <div className="dish-invites">
              <aside className="item-amount">{dish.amount}</aside>
              <p className="item-name">{dish.name}</p>
              <p className="item-note">{dish.notes}</p>
              <p className="total-item-price">{dish.amount * dish.price}</p>
            </div>
          );
        })}
      </div>
      <div className="drink-invites">
        {order.drink?.map((drink) => {
          return (
            <div className="drink-invites">
              <aside className="item-amount">{drink.amount}</aside>
              <p className="item-name">{drink.name}</p>
              <p className="item-note">{drink.notes}</p>
              <p className="total-item-price">{drink.amount * drink.price}</p>
            </div>
          );
        })}
      </div>
      <p className="order-time">
        {new Date(order.createdAt).toLocaleString("en-gb").toString()}
      </p>
      {/* <p>cancel:{canceled ? "true" : "false"}</p>
      <p>done:{order.done ? "true" : "false"}</p> */}
      <p className="total-price">
        total price: <span>{order.totalPrice}</span>
      </p>
      <button
        className="cancel-button"
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
