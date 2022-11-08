import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import DevInput from '../../models/devInput';
import Stacks from "../../models/stacks";
import { Link } from 'react-router-dom';
import './formDev.scss';

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  stacks: [{
    id: 0,
    name: "",
    experience: 0,
    is_primary: false,
  }],
  years_of_experience: 1,
  description: "",
  password: "",
  confirmedPassword: "",
  type: "developer",
};

const FormDev = () => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stacks, setStacks] = useState<Stacks[]>([]);
  const [filteredStacks, setFilteredStacks] = useState<Stacks[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<Stacks[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DevInput>({ defaultValues });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-dev.deverr.fr/stacks/all', {
          method: "GET",
          headers: {
            "access-control-allow-origin": "*",
            "Content-type": "application/json",
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
  }, [isLoaded]);

  // TODO: mapper sur le tableau selectedStacks[] pour afficher ce qui a été selectionné
  // TODO: enlever/ne pas afficher les technos qui ont déjà été selectionné
  // TODO: faire en sorte de supprimer de la selection les technos que l'on souhaite

  useEffect(() => {
    setSelectedStacks(selectedStacks);
  }, [selectedStacks]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length) {
      let filterStack = stacks.filter(stack => stack.name.toLowerCase().includes(event.target.value));
      setFilteredStacks(filterStack);
    } else {
      setFilteredStacks([]);
    }
  }

  const onSubmit: SubmitHandler<DevInput> = async (data) => {
    setLoading(true);
    const selectedStack = data.stacks.find(stack => stack.experience > 0);
    try {
      await fetch('https://api-dev.deverr.fr/register', {
        method: "POST",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json",
        },
        mode: 'cors'
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  };

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
          <input type="text" {...register("lastname")} placeholder="Nom" />

          <p className="error">{errors.firstname?.message}</p>
          <label>Prénom</label>
          <input type="text" {...register("firstname")} placeholder="Prénom" />

          <p className="error">{errors.email?.message}</p>
          <label>Email</label>
          <input type="email" {...register("email")} placeholder="E-mail" />

          <div className="stacks__container">
            <p className="error">{errors.stacks?.message}</p>
            <label>Vos compétences</label>
            <p>Ajoutez vos compétences et frameworks que vous maîtrisez.</p>
            <div className="stack__container">
              <div className="stack__input">
                <input type="text" placeholder=" Saisissez une compétence" onChange={handleChange} />
              </div>
              {
                filteredStacks.length > 0 &&
                <select onChange={(e) => {
                  const selectedStack = stacks.find(stack => stack.name === e.target.value);
                  if (selectedStack) {
                    // Dans le setSelectedStacks, on prend les anciennes valeures (current) puis
                    // on les envoie dans un nouveau tableau qui est [...current, selectedStack]
                    setSelectedStacks(current => {
                      return [...current, selectedStack]
                    })
                  }
                }}>
                  {
                    filteredStacks.map(stack => (
                      <option key={stack.id} value={stack.name}>{stack.name}</option>
                    ))
                  }
                </select>
              }
            </div>
          </div>

          <p className="error">{errors.years_of_experience?.message}</p>
          <label>Années d'expérience</label>
          <input type="number" {...register("years_of_experience")} min="1" max="10" />

          <p className="error">{errors.description?.message}</p>
          <label className="label__description">Description</label>
          <textarea className="description" {...register("description")} placeholder="Description" />

          <p className="error">{errors.password?.message}</p>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} placeholder="Mot de passe" />

          <p className="error">{errors.confirmedPassword?.message}</p>
          <label>Confirmer le mot de passe</label>
          <input type="password" {...register("confirmedPassword")} placeholder="Confirmez votre mot de passe" />
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
  );
}

export default FormDev