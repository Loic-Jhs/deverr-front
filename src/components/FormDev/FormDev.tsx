import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import DevInput from '../../models/devInput';
import Stacks from "../../models/stacks";
import schema from './formDevValidation';
import { Link } from 'react-router-dom';
import superagent from 'superagent';
import './formDev.scss';

const FormDev = () => {
  const [devInput, setDevInput] = useState<DevInput>({
    firstname: "",
    lastname: "",
    email: "",
    stacks: {
      id: 0,
      name: "",
      experience: 0,
      is_primary: false,
    },
    years_of_experience: 1,
    description: "",
    password: "",
    confirmedPassword: "",
    type: "developer",
  });
  // const [inputClear, setInputClear] = useState("");
  // getting all the values from the form but the confirmed password to send to the API
  const { confirmedPassword, ...cleanDevInput } = devInput;
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stacks, setStacks] = useState<Stacks[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<DevInput>({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-dev.deverr.fr/stacks/all', {
          method: "GET",
          headers: {
            "access-control-allow-origin": "*",
            "Content-type": "application/json",
            // Authorization: `Bearer ${auth.access_token}`
          },
          mode: 'cors'
        });
        const data = await response.json();
        setStacks(data);
        setIsLoaded(true);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [isLoaded])

  const onSubmit: SubmitHandler<DevInput> = (data) => {
    setLoading(true);
    superagent
      .post('https://api-dev.deverr.fr/register')
      .send(cleanDevInput)
      .end((err, res) => {
        // Calling the end function will send the request
        setSuccessMessage(res.body.message);
        setDevInput({
          ...devInput,
          lastname: "",
          firstname: "",
          email: "",
          stacks: {
            id: 0,
            name: "",
            experience: 0,
            is_primary: false,
          },
          years_of_experience: 0,
          description: "",
          password: "",
          confirmedPassword: ""
        })
        if (successMessage != null) {
          setLoading(false);
        }
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.value });
  }

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevInput({ ...devInput, [event.target.name]: event.target.checked });
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

          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} name="firstname" placeholder="Prénom" value={devInput.firstname} onChange={handleChange} />

          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} name="email" placeholder="E-mail" value={devInput.email} onChange={handleChange} />

          <div className="stacks__container">
            <p className="error">{errors.stacks?.message}</p>
            {/* <label>Technologies utilisées :</label> */}
            {stacks.map((stack) => {
              return (
                <>
                  {/* <label>{stack.name}</label>
                  <input type="checkbox" {...register("stacks")} name="stacks" key={stack.id} value={devInput.stacks.id} onChange={handleCheckbox} />
                  <input type="number" {...register("stacks")} name="stacks" key={stack.id} value={devInput.stacks.experience} onChange={handleChange} />
                  <input type="checkbox" {...register("stacks")} name="stacks" key={stack.id} value={devInput.stacks.is_primary} onChange={handleCheckbox} /> */}
                </>
              )
            })}
          </div>

          <p className="error">{errors.years_of_experience?.message}</p>
          <label>Années d'expérience</label>
          <input type="number" {...register("years_of_experience")} name="years_of_experience" min="1" max="10" value={devInput.years_of_experience} onChange={handleChange} />

          <p className="error">{errors.description?.message}</p>
          <label className="label__description">Description</label>
          <textarea className="description"
            name="description"
            placeholder="Description"
            value={devInput.description}
            onChange={handleTxtAreaChange}
          />

          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} name="password" placeholder="Mot de passe" value={devInput.password} onChange={handleChange} />

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