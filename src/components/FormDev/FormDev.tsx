import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import DevInput from "../../models/devInput";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./formDev.scss";
import { authContext } from "../../contexts/authContext";
import schema from "../FormDev/formDevValidation";


const FormDev = () => {
  const { auth } = useContext(authContext)

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.access_token) {
      navigate('/my-profile');
    }
  }, [auth, navigate]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DevInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<DevInput> = async (data) => {
    Object.assign(data, {type: 'developer'});
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          setSuccessMessage(responseData.message);
        });
      reset();
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="register__form__dev">
      <h1>Inscription d'un développeur</h1>
      <div className="success">
        <p>{successMessage}</p>
      </div>

      <div className="load">
        <p>{loading ? "Chargement..." : ""}</p>
      </div>

      <form className="dev__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input__container">
          <p className="error">{errors.lastname?.message}</p>
          <label>Nom</label>
          <input type="text" {...register("lastname")} placeholder="Jhon" />

          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} placeholder="Doe" />

          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="jhon-doe@email.com"
          />

          <p className="error">{errors.years_of_experience?.message}</p>
          <label>Années d'expérience</label>
          <input
            className="experience"
            type="number"
            {...register("years_of_experience")}
            min="1"
            max="10"
          />

          <p className="error">{errors.description?.message}</p>
          <label className="label__description">Description</label>
          <textarea
            className="description"
            {...register("description")}
            placeholder="Décrivez qui vous êtes et ce que vous faites !"
          />

          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} />

          <p className="error">{errors.confirmedPassword?.message}</p>
          <label>Confirmer le mot de passe</label>
          <input type="password" {...register("confirmedPassword")} />
        </div>

        <div className="button__container">
          <Link to="/registerclient">
            <p>Je suis un client</p>
          </Link>
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </section>
  );
};

export default FormDev
