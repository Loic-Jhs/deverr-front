import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import UserInput from '../../models/userInput';
import schema from './formClientValidation';
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import './formClient.scss';

const defaultValues = {
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  confirmedPassword: "",
  type: "user",
};

const FormClient = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInput>({ defaultValues });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(responseData => {
          setLoading(false);
          setSuccessMessage(responseData.message);
          setTimeout(() => { setSuccessMessage("") }, 4000);
          reset();
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="register__form__client">
      <h1>Inscription d'un client</h1>

      <div className="success">
        <p>{successMessage}</p>
      </div>

      <div className="load">
        <p>{loading ? "Chargement..." : ""}</p>
      </div>

      <form className="client__form" onSubmit={handleSubmit(onSubmit)}>

        <div className="input__container">
          <p className="error">{errors.lastname?.message}</p>
          <label>Nom</label>
          <input type="text" {...register("lastname")} name="lastname" placeholder="Nom" />
        </div>

        <div className="input__container">
          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} name="firstname" placeholder="Prénom" />
        </div>

        <div className="input__container">
          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} name="email" placeholder="E-mail" />
        </div>

        <div className="input__container">
          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} name="password" placeholder="Mot de passe" />
        </div>

        <div className="input__container">
          <p className="error">{errors.confirmedPassword?.message}</p>
          <label>Confirmer le mot de passe</label>
          <input type="password" {...register("confirmedPassword")} placeholder="Confirmez votre mot de passe" />
        </div>

        <div className="button__container">
          <Link to="/registerdev">
            <p>Je suis un dev</p>
          </Link>
          <Button type="submit">
            Envoyer
          </Button>
        </div>
      </form>
    </section>
  )
}

export default FormClient
