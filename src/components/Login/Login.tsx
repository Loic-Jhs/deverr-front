import Button from '../Button/Button';
import schema from './loginValidation';
// import logoDeverr from "../../assets/img/D.jpg";
import LoginInput from '../../models/loginInput';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from "react-hook-form";
import { authContext } from '../../contexts/authContext';

import './login.scss';

const Login = () => {

  const { setIsLogged } = useContext(authContext)

  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await fetch('http://localhost/login', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(response => response.json())
        .then(data => {
          localStorage.setItem('access_token', JSON.stringify(data.access_token));
          localStorage.setItem('token_type', JSON.stringify(data.token_type));
          localStorage.setItem('user_info', JSON.stringify(data.user_info));
          setIsLogged(true);
          if (data.user_info.user_role == 1) {
            navigate(`/dev-profile/`);
          } else if (data.user_info.user_role == 0) {
            navigate("/developers");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [event.target.name]: event.target.value });
  }

  return (
    <section>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Connexion</h1>
        <div className="input__container">
          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" placeholder="Email" {...register("email")} value={loginInput.email} onChange={handleChange} />
        </div>
        <div className="input__container">
          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} placeholder="Mot de passe" value={loginInput.password} onChange={handleChange} />
        </div>
        <Button type="submit">
          Connexion
        </Button>
        <Link to={'/forgot-password'} className="forgotPasswordLink">
          Mot de passe oublié ?
        </Link>
      </form>
    </section>
  );
}

export default Login;