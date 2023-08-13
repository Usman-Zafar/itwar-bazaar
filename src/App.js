import "./App.css";
//import { Signin } from "./Component/SigninComponent";
import { SignUp } from "./Component/SignupComponent";
import { Signin } from "./Component/SigninComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductPage } from "./Component/SellerComponent/CreateProduct/CreateProduct";
import { CustomerDashboard } from "./Component/CustomerComponent/Dashbard";
import { SellerDashboard } from "./Component/SellerComponent/Dashboard";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route exact path="/" element={<ProductPage />} /> */}
          {/* <Route exact path="/sellerproducts" element={<SellerProductPage />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/customerdashboard" element={<CustomerDashboard />} />
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
          <Route path="/createproduct" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
