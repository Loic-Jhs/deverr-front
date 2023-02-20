import * as yup from "yup";

const schema = yup.object().shape({
    firstname: yup.string()
        .min(2, "Le prénom doit contenir au moins 2 caractères")
        .max(255, "Le prénom doit contenir au maximum 255 caractères")
        .required("Le prénom est obligatoire"),
    lastname: yup.string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
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
    years_of_experience: yup.number()
        .min(1, "L'expérience doit être supérieure ou égale à 1")
        .max(10, "L'expérience doit être inférieure ou égale à 10")
        .required("L'expérience est obligatoire")
        .typeError('Ce champ est obligatoire'),
    description: yup.string()
        .min(30, "La description doit contenir au moins 30 caractères")
        .max(500, "La description doit contenir au maximum 500 caractères")
        .required("La description est obligatoire"),
});

export default schema;
