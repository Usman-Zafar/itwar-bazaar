import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
//import axios from "axios";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
  type: Yup.string().required("Please select an account type"),
});

export const SignUp = () => {
  const [value] = React.useState(""); // Step 1: Define state to hold the radio value
  return (
    <div>
      <div style={{ padding: "50px" }}>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            type: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const formData = new FormData();
            //   formData.append("file", values.avatar); // Append the image file to the form data
            formData.append("firstname", values.firstName);
            formData.append("lastname", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("type", values.type);
            for (const [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }

            // Server Attach Code.
            //   axios
            //     .post("http://localhost:4000/seller/signup", formData)
            //     .then((response) => {
            //       console.log("Response from server:", response.data);
            //     })
            //     .catch((error) => {
            //       console.error("server error");
            //     });
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={
                  errors.firstName &&
                  touched.firstName &&
                  String(errors.firstName)
                }
                onChange={(event) => {
                  setFieldValue("firstName", event.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={
                  errors.lastName && touched.lastName && String(errors.lastName)
                }
                onChange={(event) => {
                  setFieldValue("lastName", event.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                error={Boolean(errors.email && touched.email)}
                helperText={
                  errors.email && touched.email && String(errors.email)
                }
                onChange={(event) => {
                  setFieldValue("email", event.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                type="password"
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
              <FormControl error={Boolean(errors.type && touched.type)}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Account Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value.type} // Use values.type instead of value
                  onChange={(event) => {
                    setFieldValue("type", event.target.value); // Update the "type" value in formik
                  }}
                >
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="seller"
                    control={<Radio />}
                    label="Seller"
                  />
                </RadioGroup>
                {errors.type && touched.type && (
                  <div style={{ color: "red" }}>{errors.type}</div>
                )}
              </FormControl>
              <br />
              <Button variant="contained" type="submit" color="success">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
