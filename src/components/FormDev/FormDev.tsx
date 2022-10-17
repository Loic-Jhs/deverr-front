import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from 'react-router-dom';
import DevInput from '../../models/devInput';
import superagent from 'superagent';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './formDevValidation';
import './formDev.scss';

const FormDev = () => {
  const [devInput, setDevInput] = useState<DevInput>({
    firstname: "",
    lastname: "",
    email: "",
    experience: 1,
    description: "",
    password: "",
    confirmedPassword: "",
    type: "developer",
  });

  const { register, handleSubmit, formState: { errors } } = useForm<DevInput>({ resolver: yupResolver(schema) });

  // getting all the values from the form but the confirmed password to send to the API
  const { confirmedPassword, ...cleanDevInput } = devInput;

  const onSubmit: SubmitHandler<DevInput> = (data) => {
    superagent
      .post('http://api-dev.deverr.fr/register')
      .send(cleanDevInput)
      .end((err, res) => {
        // Calling the end function will send the request
        console.log(res.body.message);
        console.log(data);
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.value });
  }

  return (
    <section className="register__form__dev">
      <h1>Inscription d'un développeur</h1>
      <form className="dev__form" onSubmit={handleSubmit(onSubmit)}>

        <div className="input__container">
          <p className="error">{errors.lastname?.message}</p>
          <label>Nom</label>
          <input type="text" {...register("lastname")} name="lastname" placeholder="Nom" value={devInput.lastname} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} name="firstname" placeholder="Prénom" value={devInput.firstname} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} name="email" placeholder="E-mail" value={devInput.email} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.experience?.message}</p>
          <label>Années d'expérience</label>
          <input type="number" {...register("experience")} name="experience" min="1" max="35" value={devInput.experience} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.description?.message}</p>
          <label>Description</label>
          <input type="text" {...register("description")} name="description" placeholder="Description" value={devInput.description} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} name="password" placeholder="Mot de passe" value={devInput.password} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.confirmedPassword?.message}</p>
          <label>Confirmer le mot de passe</label>
          <input type="password" {...register("confirmedPassword")} placeholder="Confirmez votre mot de passe" value={devInput.confirmedPassword} onChange={handleChange} />
        </div>

        <div className="button__container">
          <Link to="/registerclient">
            <p>Je suis un client</p>
          </Link>
          <button type="submit" className="btn">
            <span className="span">Suivant</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormDev