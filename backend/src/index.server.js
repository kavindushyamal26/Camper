const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// //routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

// //environment variable
env.config();

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello from the server",
//   });
// });

// app.post("/data", (req, res, next) => {
//   res.status(200).json({
//     message: req.body,
//   });
// });

mongoose
  .connect(
    // "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    "mongodb://localhost:27017/CamperDB",
    // `mongodb+srv://user-1:user-1@cluster1.unibs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    // "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
// app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
