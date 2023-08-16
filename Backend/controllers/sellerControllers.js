// //const Seller = require("../modals/userModal");
// const Product = require("../modals/productModal");
// const Order = require("../modals/orderModal");
// //const jwt = require("jsonwebtoken");

// const sellerControllers = {};

// // Controller to Signup for Seller
// // sellerControllers.Signup = async (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: "No file uploaded." });
// //   }
// //   try {
// //     const { firstname, lastname, email, password, type } = req.body;
// //     // console.log(email, password, firstname, lastname);

// //     const existingSeller = await Seller.findOne({ email });

// //     if (existingSeller) {
// //       return res
// //         .status(400)
// //         .json({ error: "Seller with this email already exists." });
// //     }

// //     const newSeller = { firstname, lastname, email, password, type };
// //     const seller = await Seller.create(newSeller);
// //     res.send({ msg: "Seller Signup Successful", seller });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to sign up seller" });
// //   }
// // };

// // // Controller for Seller for Signin
// // sellerControllers.Signin = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const existingSeller = await Seller.findOne({ email });

// //     if (!existingSeller) {
// //       return res
// //         .status(404)
// //         .json({ error: "Seller with this email does not exist." });
// //     }

// //     if (existingSeller.password !== password) {
// //       return res.status(401).json({ error: "Incorrect password." });
// //     }

// //     // const token = jwt.sign(
// //     //   { id: existingSeller.id, type: existingSeller.type },
// //     //   "Secret-Key",
// //     //   {
// //     //     expiresIn: "1h",
// //     //   }
// //     // );
// //     // res.json({ token });
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to sign in seller" });
// //   }
// // };

// // Controller to Create Sellers Products
// // sellerControllers.createProduct = async (req, res) => {
// //   try {
// //     const { name, description, quantity, price } = req.body;
// //     const image = req.files.image;
// //     const sellerId = req.userId;
// //     const result = await cloudinary.uploader.upload(image.path);
// //     const newProduct = {
// //       name: name,
// //       price: price,
// //       quantity: quantity,
// //       description: description,
// //       image: result.secure_url,
// //       seller: sellerId,
// //     };
// //     console.log(newProduct);
// //     const product = await newProduct.save();
// //     res.json(product);
// //     res.send({ msg: "Seller Create Products Successful", product });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Failed to create product" });
// //   }
// // };

// // Controller to edit Sellers own Products
// sellerControllers.editProduct = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product with this ID not found." });
//     }

//     const { name, description } = req.body;
//     product.name = name || product.name;
//     product.description = description || product.description;
//     await product.save();

//     res.send(`Edit Product with ID ${id} Successful`);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to edit product" });
//   }
// };

// // Controller to Delete the Products:
// sellerControllers.deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product with this ID not found." });
//     }
//     if (product.sellerId === req.userId) {
//       await Product.findByIdAndDelete(id);
//       return res.send(`Delete Product with ID ${id} Successful`);
//     }
//     res.status(201).json({ error: "Bad Request" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete product" });
//   }
// };

// // Controller to View Sellers own Orders
// sellerControllers.viewOrders = async (req, res) => {
//   try {
//     // Assuming you have a way to associate orders with the seller, for example, using req.userId
//     const orders = await Order.find({ seller: req.userId }).populate(
//       "products"
//     );
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch seller orders" });
//   }
// };

// // Controller to View Sellers own Products
// sellerControllers.viewProduct = async (req, res) => {
//   try {
//     const products = await Product.find({ sellerId: req.userId });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch seller products" });
//   }
// };

// // Controller to edit Sellers own Order Status
// sellerControllers.editOrderStatus = async (req, res) => {
//   const { orderId } = req.params; // Assuming you have a route parameter for orderId
//   res.send(`Change Status of Order with ID ${orderId}`);
// };

// module.exports = sellerControllers;
