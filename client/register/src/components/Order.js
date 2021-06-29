import React, { useState } from "react";
import axios from "axios";
import "./styles/OrderHandler/OrderHandler.css";

export default function Order({ order }) {
  const [canceled, setCanceled] = useState(order.canceled);
  const cancelOrder = (e) => {
    // patch {cancel: true}
    axios
      .patch(`/orders/done/?c=true&id=${order._id}`)
      .then((res) => setCanceled(res.data.canceled));
  };
  console.log(order._id);

  return (
    <div className="register-order">
      <div className="items">
        <div className="order-details">
          <p className="order-time">
            <h2 className="customer-name"> {order.customerName}</h2>
            {new Date(order.createdAt).toLocaleString("en-gb").toString()}
          </p>
          <p className="total-price">
            total price: <span>{order.totalPrice}</span>
          </p>
        </div>
        <div className="dish-invites">
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
      </div>
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
