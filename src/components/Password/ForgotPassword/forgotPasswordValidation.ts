import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string()
    .email("Doit être un email valide")
    .required("L'email est obligatoire")
});

export default schema;