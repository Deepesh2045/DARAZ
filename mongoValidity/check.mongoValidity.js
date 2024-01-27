import mongoose from "mongoose";

export const checkMongoValidity = (req, res, next) => {
  // extract id from req.param
  const userId = req.params.id;
  // check validity from mongo
  const validateId = mongoose.Types.ObjectId.isValid(userId);
  // if not valid
  if (!validateId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  next();
};
