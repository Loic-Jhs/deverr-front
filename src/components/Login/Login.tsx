import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import superagent from 'superagent';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './loginValidation';
import './login.scss';
import LoginInput from '../../models/loginInput';

const Login = () => {

  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: yupResolver(schema) });
  
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    superagent
      .post('http://api-dev.deverr.fr/login')
      .send(loginInput)
      .end((err, res) => {
        // Calling the end function will send the request
        console.log(res.body.message);
        console.log(data);
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [event.target.name]: event.target.value });
  }


  return (
    <section>
      <h1>Connection</h1>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className="btn">
          <span className="span">Connexion</span>
        </button>
      </form>
    </section>
  );
}

export default Login