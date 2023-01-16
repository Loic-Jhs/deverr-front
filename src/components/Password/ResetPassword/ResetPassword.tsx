import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './ResetPasswordValidation';
import { ResetPasswordType } from "../../../types";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ResetPasswordType>({ resolver: yupResolver(schema) });
  const { token } = useParams();

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    setLoading(true);
    await fetch(`${import.meta.env.VITE_API_URL}/reset-password/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: 'cors',
      body: JSON.stringify({...data, token})
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
      <div>
        <div>
          {message && <p>{message}</p>}
        </div>
        <div className="load">
          {loading && <p> Chargement...</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input type="email" {...register("email")} name="email" placeholder="john@doe.com" />
          {errors?.email && <p>{errors.email.message}</p>}

          <label>Mot de passe</label>
          <input type="password" {...register("password")} name="password" />
          {errors?.password && <p>{errors.password.message}</p>}

          <label>Confirmation de mot de passe</label>
          <input type="password" {...register("password_confirmation")} name="password_confirmation" />
          {errors?.password_confirmation && <p>{errors.password_confirmation.message}</p>}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  )
}

export default ResetPassword;