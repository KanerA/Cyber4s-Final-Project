import React from "react";

export default function Order({ order }) {
  const cancelOrder = (e) => {
    // patch {cancel: true}
  };
  return (
    <div>
      <h2> {order.customerName}</h2>
      <p>{order.dish}</p>
      <p>{order.drink}</p>
      <p>{order.createdAt}</p>
    </div>
  );
}
// customerName: body.customerName,
// dish: body.dish,
// drink: body.drink,
