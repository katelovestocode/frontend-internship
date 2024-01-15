import * as Yup from "yup";

const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const passwordRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Please enter at least 2 characters")
    .required("Please enter name"),
  email: Yup.string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email")
    .matches(emailRegexp, "Please enter valid email"),
  password: Yup.string()
    .trim()
    .required("Please enter password")
    .min(8, "Please enter at least 8 characters")
    .matches(
      passwordRegexp,
      "Must contain at least 1 uppercase letter, 1 lowercase, 1 symbol, and 1 number"
    ),
  confirmPassword: Yup.string()
    .trim()
    .required("Please enter password again ")
    .oneOf([Yup.ref("password")], "Password doesn’t match. Please, try again"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email")
    .matches(emailRegexp, "Please enter valid email"),
  password: Yup.string().trim().required("Please enter password"),
});
