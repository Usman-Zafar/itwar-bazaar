const User = require("../modals/userModal");
const Product = require("../modals/productModal");
const Order = require("../modals/orderModal");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "Secret-Key";
const userControllers = {};

userControllers.Signup = async (req, res) => {
  const { firstname, lastname, email, password, type } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const newUser = { firstname, lastname, email, password, type };
    await User.create(newUser);

    res.send("User Signup Successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up user" });
  }
};

userControllers.Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist." });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }
    const token = jwt.sign(
      { email: existingUser.email, type: existingUser.type },
      secretKey,
      { expiresIn: "1h" }
    );
    console.log(token);

    res.json({ token, type: existingUser.type });
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in User" });
  }
};

userControllers.createProduct = async (req, res) => {
  if (req.type === "seller") {
    try {
      const { name, description, quantity, price } = req.body;
      const image = req.files.image;
      const sellerId = req.userId;
      const result = await cloudinary.uploader.upload(image.path);
      const newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        image: result.secure_url,
        seller: sellerId,
      };
      console.log(newProduct);
      const product = await newProduct.save();
      res.json(product);
      res.send({ msg: "Seller Create Products Successful", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create product" });
    }
  }
};

userControllers.editProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }

    const { name, description } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    await product.save();

    res.send(`Edit Product with ID ${id} Successful`);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit product" });
  }
};

// Controller to Delete the Products:
userControllers.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product with this ID not found." });
    }
    if (product.sellerId === req.userId) {
      await Product.findByIdAndDelete(id);
      return res.send(`Delete Product with ID ${id} Successful`);
    }
    res.status(201).json({ error: "Bad Request" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// Controller to View Sellers own Orders
userControllers.viewOrders = async (req, res) => {
  try {
    // Assuming you have a way to associate orders with the seller, for example, using req.userId
    const orders = await Order.find({ seller: req.userId }).populate(
      "products"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};

// Controller to View Sellers own Products
userControllers.viewProduct = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller products" });
  }
};

// Controller to edit Sellers own Order Status
userControllers.editOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Assuming you have a route parameter for orderId
  res.send(`Change Status of Order with ID ${orderId}`);
};

module.exports = userControllers;
