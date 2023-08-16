import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
export const Signin = () => {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setLoginType } = useAuth();
  const handleSignIn = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/signin",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoggedIn(true);
      setLoginType(response.data.type);
      const { token, type } = response.data;
      console.log(type);
      // Store the token in localStorage
      localStorage.setItem("Authorization", token);

      // Use navigate to navigate based on user type

      if (type === "seller") {
        navigate("/createproduct");
      } else if (type === "customer") {
        navigate("/customerdashboard");
      }
      console.log("Signin Successful");
    } catch (error) {
      setServerError("Invalid email or password.");
    }
  };
  return (
    <div style={{ padding: "50px" }}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSignIn}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email && String(errors.email)}
              onChange={(event) => {
                setFieldValue("email", event.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              error={Boolean(errors.password && touched.password)}
              helperText={
                errors.password && touched.password && String(errors.password)
              }
              onChange={(event) => {
                setFieldValue("password", event.target.value);
              }}
            />
            <br />
            <br />
            <Button variant="contained" type="submit" color="success">
              Submit
            </Button>
            <br />
            <Button href="http://localhost:3000/signup">
              Dont Have an Account?
            </Button>
          </Form>
        )}
      </Formik>
      {serverError && <p>{serverError}</p>}
    </div>
  );
};
