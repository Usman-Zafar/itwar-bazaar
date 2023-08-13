import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton, List, ListItem, ListItemText } from "@mui/material";

import "./Cart.css";
import { Navigate } from "react-router-dom";

export const Cart = ({ onAddToCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = Navigate();

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    onAddToCart(product);
  };

  const handleOpenCart = () => {
    navigate("/cart");
  };

  return (
    <div className="Cart">
      <IconButton onClick={() => console.log(cartItems)}>
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

// import React, { useState } from "react";

// const ChildComponent = ({ onDataReady }) => {
//   const [data, setData] = useState("");

//   const handleChange = (event) => {
//     const newData = event.target.value;
//     setData(newData);
//     // Call the callback function to pass data to the parent
//     onDataReady(newData);
//   };

//   return (
//     <div>
//       <h3>Child Component</h3>
//       <input type="text" value={data} onChange={handleChange} />
//     </div>
//   );
// };

// export default ChildComponent;
