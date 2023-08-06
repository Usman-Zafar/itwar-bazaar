import "./App.css";
// import { Signin } from "./Component/SigninComponent";
// import { SignUp } from "./Component/SignupComponent";
import { CustomerHeader } from "./Component/CustomerComponent/HeaderComponent";
import { CustomerFooter } from "./Component/CustomerComponent/FooterCoponent";
function App() {
  return (
    <div className="App">
      {/* <SignUp />
      <Signin /> */}
      <CustomerHeader />
      <CustomerFooter />
    </div>
  );
}

export default App;
