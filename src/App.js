import "./App.css";
// import { Signin } from "./Component/SigninComponent";
// import { SignUp } from "./Component/SignupComponent";
import { CustomerHeader } from "./Component/CustomerComponent/HeaderComponent";
import { CustomerFooter } from "./Component/CustomerComponent/FooterCoponent";
import { ProductPage } from "./Component/SellerComponent/CreateProduct/CreateProduct";
function App() {
  return (
    <div className="App">
      {/* <SignUp />
      <Signin /> */}
      <CustomerHeader />
      <ProductPage />
      <CustomerFooter />
    </div>
  );
}

export default App;
