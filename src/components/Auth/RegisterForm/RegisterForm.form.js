import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    email: "",
    username: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
  });
}
