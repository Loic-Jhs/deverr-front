import * as yup from "yup";

const schema = yup.object().shape({
  firstname: yup.string()
    .min(3, "Le prénom doit contenir au moins 3 caractères")
    .max(255, "Le prénom doit contenir au maximum 255 caractères")
    .required("Le prénom est obligatoire"),
  lastname: yup.string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(255, "Le nom doit contenir au maximum 255 caractères")
    .required("Le nom est obligatoire"),
  email: yup.string()
    .email("L'adresse email n'est pas valide")
    .required("L'adresse email est obligatoire"),
  password: yup.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(255, "Le mot de passe doit contenir au maximum 255 caractères")
    .required("Le mot de passe est obligatoire"),
  confirmedPassword: yup.string()
    .oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est obligatoire"),
});

export default schema;