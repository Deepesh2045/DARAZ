import express from "express";
import { Products } from "./product.model.js";
import mongoose from "mongoose";
const router = express.Router();

// add product
router.post("/product/add", async (req, res) => {
  console.log(req.body);
  const newProduct = req.body;
  await Products.create(newProduct);
  return res.status(201).send({ message: "Product added success" });
});

// Get Product Details by Id
router.get("/Product/details/:id", async (req, res) => {
  // Extract product from req.param.id
  const getProduct = req.params.id;
  // check id validity from mongo
  const isValidProduct = mongoose.Types.ObjectId.isValid(getProduct);
  // if not valid throw error msg
  if (!isValidProduct) {
    return res.status(400).send({ message: "Invalid Mongo Id" });
  }
  // find product by id
  const isGetProduct = await Products.findOne({ _id: getProduct });
  // If not find product throw error msg
  if (!isGetProduct) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  // Send Product Details as response
  return res.status(200).send({ message: "Success", Products: isGetProduct });
});

// Delete Product by id
router.delete("/product/delete/:id", async (req, res) => {
  // Extract id from req.param
  const getProduct = req.params.id;
  // Check id validity from mongo
  const isValidProduct = mongoose.Types.ObjectId.isValid(getProduct);
  // If not id valid
  if (!isValidProduct) {
    return res.status(400).send({ message: "Invalid mongo id..." });
  }
  // find Product
  const isGetProduct = await Products.findOne({ _id: getProduct });
  // If not find product throw error
  if (!isGetProduct) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  await Products.deleteOne({ _id: getProduct });

  return res.status(201).send({ message: "Product Deleted Successfully" });
});

// Edit Product by id
router.put("/Product/edit/:id", async (req, res) => {
  // Extract id from req.param
  const getProduct = req.params.id;
  // Check id validity from mongo
  const isValidProduct = mongoose.Types.ObjectId.isValid(getProduct);
  // if not valid id throw error msg
  if (!isValidProduct) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  // Find product
  const isGetProduct = await Products.findOne({ _id: getProduct });
  // If not find product throw error msg
  if (!isGetProduct) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  // Extract new values from req.body
  const newEditValues = req.body;
  // Update values
  await Products.updateOne(
    { _id: getProduct },
    {
      $set: {
        ...newEditValues,
      },
    }
  );

  return res.status(200).send({ message: "Product Edited Successfully" });
});

export default router;
