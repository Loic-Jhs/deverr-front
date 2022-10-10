import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserInput from './models/userInput';
import './formClient.scss';

const FormClient = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.password === userInput.confirmedPassword) {
      try {
        const {
          confirmedPassword,
          ...cleanUserInput
        } = userInput;
        // const response = axios.post("http://api-dev.deverr.fr/register", cleanUserInput);
        const response = axios({
          method: "POST",
          url: "http://api-dev.deverr.fr/register",
          data: cleanUserInput,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
    // console.log(event.target.name);
    // console.log(event.target.value);
  }

  return (
    <>
      <section className="register__form__client">
        <h1>Inscription d'un client</h1>
        <form className="client__form" onSubmit={handleSubmit}>
          <input type="text" name="lastname" placeholder="Nom" value={userInput.lastname} onChange={handleChange} />
          <input type="text" name="firstname" placeholder="Prénom" value={userInput.firstname} onChange={handleChange} />
          <input type="email" name="email" placeholder="E-mail" value={userInput.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Mot de passe" value={userInput.password} onChange={handleChange} />
          <input type="password" name="confirmedPassword" placeholder="Confirmez votre mot de passe" value={userInput.confirmedPassword} onChange={handleChange} />
          <button type="submit" className="btn">Suivant</button>
        </form>
        <Link to="/registerdev" style={{ textDecoration: "none" }}>
          <p>Je suis un dev</p>
        </Link>
      </section>
    </>
  )
}

export default FormClient
