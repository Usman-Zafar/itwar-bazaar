import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./CreateProduct.css";

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Required"),
  quantity: Yup.number()
    .min(0, "Quantity must be a positive number")
    .required("Required"),
  description: Yup.string().required("Required"),
  image: Yup.mixed().required("Please select an image file."),
});

export const ProductPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  return (
    <div className="Container">
      <div className="ProductForm">
        <div className="ProductPage">
          <h1>Add Product</h1>
          <Formik
            initialValues={{
              name: "",
              description: "",
              quantity: "",
              price: "",
              image: null,
            }}
            validationSchema={ProductSchema}
            // onSubmit={(values) => {
            //   const formData = new FormData();
            //   formData.append("name", values.name);
            //   formData.append("quantity", values.quantity);
            //   formData.append("price", values.price);
            //   formData.append("description", values.description);
            //   formData.append("image", values.image);
            //   console.log(formData);
            //   axios
            //     .post("http://localhost:8000/user/product", formData, {
            //       headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `${localStorage.getItem("Authorization")}`,
            //       },
            //     })
            //     .then((response) => {
            //       console.log(response);
            //       console.log("Product added successfully:", response.data);
            //     })
            //     .catch((error) => {
            //       console.error("Error adding product:", error.response);
            //     });
            // }}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("quantity", values.quantity);
              formData.append("price", values.price);
              formData.append("description", values.description);
              formData.append("image", values.image);

              axios
                .post("http://localhost:8000/user/product", formData, {
                  headers: {
                    Authorization: `${localStorage.getItem("Authorization")}`,
                  },
                })
                .then((response) => {
                  console.log("Product added successfully:", response.data);
                })
                .catch((error) => {
                  console.error("Error adding product:", error.response);
                });
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <TextField
                  name="name"
                  label="Product Name"
                  variant="standard"
                  error={Boolean(errors.name && touched.name)}
                  helperText={
                    errors.name && touched.name && String(errors.name)
                  }
                  onChange={(event) => {
                    setFieldValue("name", event.target.value);
                  }}
                />
                <br />
                <TextField
                  name="quantity"
                  label="Quantity"
                  variant="standard"
                  type="number"
                  error={Boolean(errors.quantity && touched.quantity)}
                  helperText={
                    errors.quantity &&
                    touched.quantity &&
                    String(errors.quantity)
                  }
                  onChange={(event) => {
                    setFieldValue("quantity", event.target.value);
                  }}
                />
                <br />
                <TextField
                  name="price"
                  label="Price"
                  variant="standard"
                  type="number"
                  error={Boolean(errors.price && touched.price)}
                  helperText={
                    errors.price && touched.price && String(errors.price)
                  }
                  onChange={(event) => {
                    setFieldValue("price", event.target.value);
                  }}
                />
                <br />
                <TextField
                  name="description"
                  label="Description"
                  variant="standard"
                  multiline
                  rows={4}
                  error={Boolean(errors.description && touched.description)}
                  helperText={
                    errors.description &&
                    touched.description &&
                    String(errors.description)
                  }
                  onChange={(event) => {
                    setFieldValue("description", event.target.value);
                  }}
                />
                <br />
                {/* <TextField
                  name="image"
                  variant="standard"
                  type="file"
                  error={Boolean(errors.image && touched.image)}
                  helperText={
                    errors.image && touched.image && String(errors.image)
                  }
                  onChange={(event) => {
                    const selectedImage = event.target.files[0];
                    setFieldValue("image", selectedImage);
                    setUploadedImage(URL.createObjectURL(selectedImage));
                  }} 
                />*/}
                <TextField
                  name="image"
                  variant="standard"
                  type="file"
                  error={Boolean(errors.image && touched.image)}
                  helperText={
                    errors.image && touched.image && String(errors.image)
                  }
                  onChange={(event) => {
                    const selectedImage = event.target.files[0];
                    setFieldValue("image", selectedImage);

                    // Generate a temporary URL for displaying the uploaded image
                    setUploadedImage(URL.createObjectURL(selectedImage));
                  }}
                />

                <br />

                <Button type="submit" variant="contained" color="success">
                  Add Product
                </Button>
                <br />
                <br />

                <div className="ProductImage">
                  {uploadedImage && (
                    <img
                      src={uploadedImage}
                      alt="Uploaded Product"
                      className="uploaded-image"
                      style={{ height: "100px", width: "100%" }}
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
