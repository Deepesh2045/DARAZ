import express from "express";
import connectDb from "./connectdDB.js";
import productRouter from "./Products/product.route.js";
import userRoute from "./User/user.route.js";

const app = express();
// To make app understand json
app.use(express.json());

// connect Database
connectDb();

// routes register
app.use(productRouter);
app.use(userRoute);

const port = 8000;
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
