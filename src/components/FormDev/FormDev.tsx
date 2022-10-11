import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DevInput from '../../models/devInput';
import superagent from 'superagent';

import './formDev.scss';

const FormDev = () => {
  const [devInput, setDevInput] = useState<DevInput>({
    firstname: "",
    lastname: "",
    email: "",
    experience: 0,
    description: "",
    password: "",
    confirmedPassword: "",
    type: "developer",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (devInput.password === devInput.confirmedPassword) {
      try {
        const {
          confirmedPassword,
          ...cleanDevInput
        } = devInput;
        superagent
          .post('http://api-dev.deverr.fr/register')
          .send(cleanDevInput)
          .end((err, res) => {
            // Calling the end function will send the request
            console.log(res.body.access_token);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.value });
  }


  return (
    <>
      <section className="register__form__dev">
        <h1>Inscription d'un développeur</h1>
        <form className="dev__form" onSubmit={handleSubmit}>
          <input type="text" name="lastname" placeholder="Nom" value={devInput.lastname} onChange={handleChange} />
          <input type="text" name="firstname" placeholder="Prénom" value={devInput.firstname} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={devInput.email} onChange={handleChange} />
          <input type="number" name="experience" placeholder="années d'expériences" value={devInput.experience} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={devInput.description} onChange={handleChange} />
          <input type="password" name="password" placeholder="Mot de passe" value={devInput.password} onChange={handleChange} />
          <input type="password" name="confirmedPassword" placeholder="Confirmez votre mot de passe" value={devInput.confirmedPassword} onChange={handleChange} />
          <button type="submit" className="btn">
            <span className="span">Suivant</span>
          </button>
        </form>
        <Link to="/registerclient">
          <p>Je suis un client</p>
        </Link>
      </section>
    </>
  )
}

export default FormDev