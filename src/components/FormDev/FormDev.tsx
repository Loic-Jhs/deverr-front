import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import DevInput from '../../models/devInput';
import schema from './formDevValidation';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
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

  const [inputClear, setInputClear] = useState("");

  const { register, handleSubmit, formState: { errors} } = useForm<DevInput>({ resolver: yupResolver(schema) });
  // getting all the values from the form but the confirmed password to send to the API
  const { confirmedPassword, ...cleanDevInput } = devInput;
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<DevInput> = (data) => {
    setLoading(true);
    superagent
      .post('https://api-dev.deverr.fr/register')
      .send(cleanDevInput)
      .end((err, res) => {
        // Calling the end function will send the request
        setSuccessMessage(res.body.message);
        setDevInput({...devInput, 
          lastname: "",
          firstname: "",
          email: "",
          experience: 0,
          description: "",
          password: "",
          confirmedPassword: ""
        })
        if(successMessage != null) {
          setLoading(false);
        }
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.value });
  }

  const handleTxtAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.value });
  }

  return (
    <section className="register__form__dev">
      <h1>Inscription d'un développeur</h1>
      <div className="succes">
        <p>{successMessage}</p>
      </div>

      <div className="load">
        <p>{loading ? "Chargement..." : ""}</p>
      </div>

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
          <input type="number" {...register("experience")} name="experience" min="1" max="10" value={devInput.experience} onChange={handleChange} />
        </div>

        <div className="input__container">
          <p className="error">{errors.description?.message}</p>
          <label className="label__description">Description</label>
          <textarea className="description"
            name="description"
            placeholder="Description"
            value={devInput.description}
            onChange={handleTxtAreaChange}
          />
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