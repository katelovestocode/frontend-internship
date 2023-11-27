import * as Yup from "yup";

// const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const passwordRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const updateUserSchema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter at least 2 characters"),
  password: Yup.string()
    .trim()
    .min(8, "Please enter at least 8 characters")
    .matches(
      passwordRegexp,
      "Must contain at least 1 uppercase letter, 1 lowercase, 1 symbol, and 1 number"
    ),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Password doesn’t match. Please, try again"),
});
