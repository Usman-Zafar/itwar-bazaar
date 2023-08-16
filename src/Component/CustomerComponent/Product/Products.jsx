import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
//import { Cart } from "../Cart";
import "./Products.css";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="ProductCard">
      <CardMedia component="img" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rs.{product.price}
        </Typography>
      </CardContent>
      <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
    </Card>
  );
};

const ProductsList = ({ products, onAddToCart }) => {
  return (
    <Grid container spacing={1}>
      {products.map((product) => (
        <Grid item className="Grid-item" key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export const Product = () => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/purchaser/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    // Update the state of the Cart component with the new product
  };
  return (
    <div>
      <h1>Product List</h1>
      <ProductsList
        products={products}
        onAddToCart={() =>
          isLoggedIn ? (
            <>
              <Link to="/Cart">Add to Cart</Link>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </>
          ) : (
            <Link to="/signin">Add to Cart</Link>
          )
        }
      />

      {/* <Cart onAddToCart={handleAddToCart} /> */}
    </div>
  );
};

// import React, { useState } from "react";
// import ChildComponent from "./ChildComponent";

// const ParentComponent = () => {
//   const [dataFromChild, setDataFromChild] = useState("");

//   // Callback function to receive data from the child component
//   const handleDataFromChild = (data) => {
//     setDataFromChild(data);
//   };

//   return (
//     <div>
//       <h2>Parent Component</h2>
//       <ChildComponent onDataReady={handleDataFromChild} />
//       {/* Render the data received from the child */}
//       <p>Data from Child: {dataFromChild}</p>
//     </div>
//   );
// };

// export default ParentComponent;
