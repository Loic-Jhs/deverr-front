import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string()
    .email("L'adresse email n'est pas valide")
    .required("L'adresse email est obligatoire"),
  password: yup.string()
    .max(255, "Le mot de passe doit contenir au maximum 255 caractères")
    .required("Le mot de passe est obligatoire"),
});

export default schema;