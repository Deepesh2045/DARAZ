import express from "express";
import { User } from "./user.model.js";
import { validateSchema } from "./user.validation.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import bcrypt from "bcrypt";
import { checkMongoValidity } from "../mongoValidity/check.mongoValidity.js";

const router = express.Router();

// router.post("/user/add", async (req, res) => {
//   const newUser = req.body;
//   await User.create(newUser);
//   return res.status(201).send({ message: "New user added Successfully" });
// });
router.post("/user/add", validateReqBody(validateSchema), async (req, res) => {
  // extract user from req.body
  const newUser = req.body;
  // check email already exist
  const userData = await User.findOne({ email: newUser.email });
  // if exist throw error
  if (userData) {
    return res.status(400).send({ message: "User email already exist" });
  }
  // extract password,confirmPassword from req.body
  const { password, confirmPassword } = req.body;
  // if not equal password and confirm password
  if (password !== confirmPassword) {
    return res.status(409).send({ message: "Password does not match" });
  }
  // hash password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
  const hashedConfirmPassword = await bcrypt.hash(
    newUser.confirmPassword,
    saltRounds
  );

  newUser.password = hashedPassword;
  newUser.confirmPassword = hashedConfirmPassword;

  // create user
  await User.create(newUser);
  // send response
  return res.status(200).send({ message: "New user register successfully." });
});

// get user details by id
router.get("/user/details/:id", checkMongoValidity, async (req, res) => {
  // extract user from req.param
  const userId = req.params.id;
  // find user
  const userData = await User.findOne({ _id: userId });
  // if not find throw error
  if (!userData) {
    return res.status(409).send({ message: "User does not exist" });
  }
  // send response
  return res.status(200).send({ message: "Success", data: userData });
});

// delete user
router.delete("/user/delete/:id", checkMongoValidity, async (req, res) => {
  // extract id from req.params
  const userId = req.params.id;
  // find user
  const userData = await User.findOne({ _id: userId });
  // if not user throw error
  if (!userData) {
    return res.status(400).send({ message: "User does not exist." });
  }
  // delete user
  await User.deleteOne({ _id: userData });
  return res.status(200).send({ message: "User deleted successfully." });
});

// edit user
router.put(
  "/user/edit/:id",
  checkMongoValidity,
  validateReqBody(validateSchema),
  async (req, res) => {
    // extract id from req.params
    const userId = req.params.id;
    const neValues = req.body;
    // check use exist
    const userData = await User.findOne({ _id: userId });
    // if user not exist throw error
    if (!userData) {
      return res.status(400).send({ message: "User does not exist." });
    }
    // edit user
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          ...neValues,
        },
      }
    );
    // send response
    return res.status(200).send({message:"User updated successfully"})
  }
);
export default router;
