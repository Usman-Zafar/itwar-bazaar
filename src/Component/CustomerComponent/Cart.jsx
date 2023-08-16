import React from "react";

export const Cart = ({ cartItems, onRemoveFromCart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Rs.{item.price}</p>
          <button onClick={() => onRemoveFromCart(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
