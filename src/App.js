import "./App.css";
import { Signin } from "./Component/SigninComponent";
import { SignUp } from "./Component/SignupComponent";

function App() {
  return (
    <div className="App">
      <SignUp />
      <Signin />
    </div>
  );
}

export default App;
