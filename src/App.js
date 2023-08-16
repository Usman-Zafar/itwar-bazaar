import "./App.css";
//import { Signin } from "./Component/SigninComponent";
import { SignUp } from "./Component/SignupComponent";
import { Signin } from "./Component/SigninComponent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ProductPage } from "./Component/SellerComponent/CreateProduct/CreateProduct";
import { CustomerDashboard } from "./Component/CustomerComponent/Dashbard";
import { SellerDashboard } from "./Component/SellerComponent/Dashboard";
import { Cart } from "./Component/CustomerComponent/Cart";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route exact path="/" element={<ProductPage />} /> */}
          {/* <Route exact path="/sellerproducts" element={<SellerProductPage />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/customerdashboard" element={<Navigate to="/" />} />
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
          <Route path="/createproduct" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
