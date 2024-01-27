import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  color: {
    type: [String],
    required: true,
    trim: true,
  },
});
 export const Products = mongoose.model("Products", productSchema)
