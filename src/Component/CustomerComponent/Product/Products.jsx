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
import "./Products.css";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";

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

export const Product = () => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);

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
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };
  const redirectToSignIn = () => {
    <Link to="/signin"></Link>; // Redirect to signin page
  };
  return (
    <div>
      <h1>Product List</h1>
      <ProductsList
        products={products}
        onAddToCart={isLoggedIn ? handleAddToCart : redirectToSignIn}
      />
      <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
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
