import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string()
    .email("Doit être un email valide")
    .required("L'email est obligatoire"),
  password: yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(255, "Le mot de passe doit contenir au maximum 255 caractères")
    .required("Le mot de passe est obligatoire"),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est obligatoire"),
});

export default schema;