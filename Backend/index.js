const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Routes
const authRoutes = require("./Routes/AuthRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
const userRoutes = require("./Routes/UserRoutes")
const sellerRoutes = require("./Routes/SellerRoutes")
const discountRoutes = require("./Routes/DiscounRoutes")
const productRoutes = require("./Routes/ProductRoutes")

app.use(
  cors({
    origin: "*",
  })
);


const connectDB = async () => {
  try {
    const connection = mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 30000
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB not connected", err);
  }
};
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/seller",sellerRoutes)
app.use("/api/v1/discount",discountRoutes)
app.use("/api/v1/product",productRoutes)
app.listen(PORT, console.log("Server is Running", PORT));
