import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import UserInput from '../../models/userInput';
import superagent from 'superagent';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './formClientValidation';
import './formClient.scss';

const FormClient = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmedPassword: "",
    type: "client",
  });

  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({ resolver: yupResolver(schema) });
  const { confirmedPassword, ...cleanUserInput } = userInput;
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<UserInput> = (data) => {
    setLoading(true);
    superagent
      .post('http://api-dev.deverr.fr/register')
      .send(cleanUserInput)
      .end((err, res) => {
        // Calling the end function will send the request
        setSuccessMessage(res.body.message);
        setUserInput({
          ...userInput,
          lastname: "",
          firstname: "",
          email: "",
          password: "",
          confirmedPassword: ""
        })
        if (successMessage != null) {
          setLoading(false);
        }
      });
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