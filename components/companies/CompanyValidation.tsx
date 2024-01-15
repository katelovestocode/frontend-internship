import * as Yup from "yup";

export const createACompanySchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Please enter name")
    .min(2, "Please enter at least 2 characters"),
  description: Yup.string()
    .trim()
    .required("Please enter description")
    .min(15, "Please enter at least 15 characters"),
});

export const updateCompanySchema = Yup.object({
  name: Yup.string().trim().min(2, "Please enter at least 2 characters"),
  description: Yup.string()
    .trim()
    .min(15, "Please enter at least 15 characters"),
});
