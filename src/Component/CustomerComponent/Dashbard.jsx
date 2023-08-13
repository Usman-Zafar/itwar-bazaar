import React from "react";
import { CustomerHeader } from "./HeaderComponent";
import { Product } from "./Product/Products";
import { CustomerFooter } from "./FooterComponent";
export const CustomerDashboard = () => {
  return (
    <div>
      <CustomerHeader />
      <Product />
      <CustomerFooter />
    </div>
  );
};
