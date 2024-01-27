import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max_length: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    max_length: 50,
    trim: true,
  },
  address: {
    temporary: String,
    permanent: String,
  },
  email: {
    type: String,
    required: true,
    max_length: 50,
    trim: true,
    unique: true,
  },
  contactNumber: {
    type: Number,
    // required: true,
    max_length: 10,
    default: null,
  },
  password: {
    type: String,
    required: true,
    max_length: 20,
    min_length: 6,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    max_length: 20,
    min_length: 6,
    trim: true,
  },
});
export const User = mongoose.model("User", userSchema);
