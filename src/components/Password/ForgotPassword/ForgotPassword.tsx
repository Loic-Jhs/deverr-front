import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './forgotPasswordValidation';
import { ForgotPasswordType } from "../../../types";
import { useState } from "react";
import "./style.scss";

function ForgotPassword() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordType>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
    setLoading(true);
    await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);

        setMessage(responseData);
        reset();
      })
      .catch(error => {
        console.error(error)
      })
  }

  // TODO: Ajouter du style
  return (
    <>
      <div className="forgot-password__container">
        <h1>Vous avez oubliez votre mot de passe?</h1>
        <div>
          {message && <p>{message}</p>}
        </div>
        <div className="load">
          {loading && <p> Chargement...</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Votre email :</label>
          <input type="email" {...register("email")} name="email" placeholder="john@doe.com" />
          {errors?.email && <p>{errors.email.message}</p>}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  )
}

export default ForgotPassword;