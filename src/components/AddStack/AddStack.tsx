import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authContext } from '../../contexts/authContext';
import Stacks from '../../models/stacks';
import { DevStack } from '../../types';
import { DevInfos } from '../../types';
import Button from '../Button/Button';

import './addStack.scss';

interface modaleProps {
  toggleStack: () => void;
  devStacks: DevStack[];
}

function AddStack({ toggleStack, devStacks }: modaleProps) {
  const { auth } = useContext(authContext);
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [stacks, setStacks] = useState<Stacks[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<Stacks>();
  const filteredStacks = stacks.filter((stack) => {
    return !devStacks.find((devStack) => 
      devStack.id === stack.id
    )
  });

  useEffect(() => {
    if (auth && auth.access_token != undefined) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost/stacks/all', {
            method: "GET",
            headers: {
              "access-control-allow-origin": "*",
              "Content-type": "application/json",
              Authorization: `Bearer ${auth.access_token}`
            },
            mode: 'cors'
          });
          const data = await response.json();
          setStacks(data);
          setIsLoaded(true);
        } catch (e) {
          console.error(e);
        }
      }
      fetchData();
    }
  }, [isLoaded]);

  const onSubmit: SubmitHandler<Stacks> = async (data) => {
    const stacksDataRequired = {
      developer_id: auth.user_info.user_id,
      stack_id: Number(data.id),
      stack_experience: 10,
      is_primary: false
    };

    try {
      const response = await fetch(`http://localhost/profile/add-stack/${stacksDataRequired.stack_id}`, {
        method: "POST",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem('access_token')?.replaceAll('"', '')
        },
        body: JSON.stringify(stacksDataRequired),
        mode: 'cors'
      });
      const data = await response.json();
      setSuccessMessage(data.message + " !");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='dev__stacks'>
        <form id="stacksForm" className="stacks__form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Choisissez une nouvelle Techno</h1>
          <select {...register("id", { required: true })}>
            <option value="">Sélectionnez une techno</option>
            {filteredStacks.map((stack) => {
              return (
                <option key={stack.id} value={stack.id}>{stack.name}</option>
              )
            })}
          </select>
          {errors.id && <p className="error">Selectionnez une techno !</p>}
          <Button type="submit">
            Ajouter
          </Button>
        </form>
      </div>
      <div className="success">
        <p>{successMessage}</p>
      </div>
    </>
  );
}

export default AddStack
