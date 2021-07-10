import React, { useState } from "react";
import { network } from "../utils/networkWrapper";
import "./styles/OrderHandler/OrderHandler.css";

export default function Order({ order, cancelOrder }) {
  return (
    <div className="register-order">
      <div className="items">
        <div className="order-details">
          <h2 className="customer-name"> {order.customerName}</h2>
          <p className="order-time">
            {new Date(order.createdAt).toLocaleString("en-gb").toString()}
          </p>
          <p className="total-price">
            total price: <span>{order.totalPrice}</span>
          </p>
        </div>
        <div className="dish-invites">
          {order.dish?.map((dish, i) => {
            return (
              <div className="invite" key={`dish ${i}`}>
                <p className="item-amount">{dish.amount}X</p>
                <div className="item-details">
                  <p className="item-name">{dish.name}</p>
                  <p className="item-note">{dish.notes}</p>
                  <p className="total-item-price">{dish.amount * dish.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="drink-invites">
          {order.drink?.map((drink, i) => {
            return (
              <div className="invite" key={`drink ${i}`}>
                <p className="item-amount">{drink.amount}X</p>
                <div className="item-details">
                  <p className="item-name">{drink.name}</p>
                  <p className="item-note">{drink.notes}</p>
                  <p className="total-item-price">
                    {drink.amount * drink.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="cancel-button"
        onClick={() => {
          cancelOrder(order);
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
