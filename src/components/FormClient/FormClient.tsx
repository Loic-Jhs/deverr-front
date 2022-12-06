import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import UserInput from '../../models/userInput';
import schema from './formClientValidation';
import { Link } from 'react-router-dom';
import './formClient.scss';

const FormClient = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmedPassword: "",
    type: "user",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { confirmedPassword, ...cleanUserInput } = userInput;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    setLoading(true);
    try {
      await fetch('https://api-dev.deverr.fr/register', {
        method: "POST",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(cleanUserInput),
      })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);
        setSuccessMessage(responseData.message);
        setTimeout(() => {setSuccessMessage("")}, 4000);
        setUserInput({
          lastname: "",
          firstname: "",
          email: "",
          password: "",
          confirmedPassword: "",
          type: "user",
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
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
          <input type="text" {...register("lastname")} name="lastname" placeholder="Nom" value={userInput.lastname} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} name="firstname" placeholder="Prénom" value={userInput.firstname} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} name="email" placeholder="E-mail" value={userInput.email} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} name="password" placeholder="Mot de passe" value={userInput.password} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.confirmedPassword?.message}</p>
          <label>Confirmer le mot de passe</label>
          <input type="password" {...register("confirmedPassword")} placeholder="Confirmez votre mot de passe" value={userInput.confirmedPassword} onChange={handleChange} />
        </div>

        <div className="button__container">
          <Link to="/registerdev">
            <p>Je suis un dev</p>
          </Link>
          <button type="submit" className="btn">
            <span className="span">Suivant</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormClient