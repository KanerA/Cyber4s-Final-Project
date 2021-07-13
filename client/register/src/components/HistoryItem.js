import React from "react";

function HistoryItem({ order }) {
  return (
    <div className="history-order">
      <div className="history-items">
        <div className="history-order-details">
          <h2 className="history-customer-name"> {order.customerName}</h2>
          <p className="history-order-time">
            {new Date(order.createdAt).toLocaleString("en-gb").toString()}
          </p>
          <p className="history-total-price">
            total price: <span>{order.totalPrice}</span>
          </p>
        </div>
        <div className="history-dish-invites">
          {order.dish?.map((dish, i) => {
            return (
              <div className="invite" key={`dish ${i}`}>
                <p className="item-amount">{dish.amount}X</p>
                <div className="item-details">
                  <p className="item-name">{dish.name}</p>
                  {dish.options?.map((option, i) => {
                    return (
                      <p className="item-checkboxes">
                        {option.name}
                        {option.price > 0 && (
                          <span className="small-price">{option.price}</span>
                        )}
                      </p>
                    );
                  })}
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
                  {drink.options?.map((option, i) => {
                    return (
                      <p className="item-checkboxes">
                        {option.name}
                        {option.price > 0 && (
                          <span className="small-price">{option.price}</span>
                        )}
                      </p>
                    );
                  })}
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
    </div>
  );
}

export default HistoryItem;
