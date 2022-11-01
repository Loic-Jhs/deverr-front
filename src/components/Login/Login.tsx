import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import superagent from 'superagent';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './loginValidation';
import LoginInput from '../../models/loginInput';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { authContext } from '../../contexts/authContext';

const Login = () => {

  const { setAuth } = useContext(authContext)

  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    superagent
      .post('https://api-dev.deverr.fr/login')
      .send(loginInput)
      .end((err, res) => {
        // Calling the end function will send the request
        localStorage.setItem('access_token', JSON.stringify(res.body.access_token)),
        localStorage.setItem('token_type', JSON.stringify(res.body.token_type)),
        localStorage.setItem('user_info', JSON.stringify(res.body.user_info))
        
        setAuth({
          access_token: JSON.parse(localStorage.getItem('access_token') ?? ''),
          token_type: JSON.parse(localStorage.getItem('token_type') ?? ''),
          user_info: JSON.parse(localStorage.getItem('user_info') ?? '')
        })
        // Entourer d'un if pour gérer la redirection en fonction du rôle
        if (res.body.user_info.user_role == 1 && res.body.access_token != undefined) {
          navigate(`/dev-profile/${res.body.user_info.developer_id}`);
        } else if (res.body.access_token != undefined) {
          navigate("/developers");
        }
      });
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

        <div className="button__container">
          <button type="submit" className="btn">
            <span className="span">Connexion</span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login