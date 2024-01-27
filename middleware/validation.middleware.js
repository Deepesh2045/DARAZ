export const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    // extract user from req.body
    const newUser = req.body;
    // validate new user
    try {
      req.body = await validationSchema.validate(req.body);

      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
};
