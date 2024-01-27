import Yup from "yup";

export const validateSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .max(50, "First name must be at most 50 characters")
    .trim(),
  lastName: Yup.string()
    .required("Last name is required")
    .max(50, "Last name must be at most 50 characters")
    .trim(),
  address: Yup.object().shape({
    temporary: Yup.string(),
    permanent: Yup.string(),
  }),
  email: Yup.string()
    .required("Email is required")
    .max(50, "Email must be at most 50 characters")
    .trim()
    .email("Invalid email format"),
  contactNumber: Yup.number()
    .max(9999999999, "Contact number must be at most 10 digits")
    .nullable(),
  password: Yup.string()
    .required("Password must be required")
    .max(20, "Password must be at max 20 character")
    .min(6, "Password must be at min 6 character")
    .trim(),
  confirmPassword: Yup.string()
    .required("Confirm Password must be required")
    .max(20, "Confirm Password must be at max 20 character")
    .min(6, "Confirm Password must be at min 6 character")
    .trim(),
});
