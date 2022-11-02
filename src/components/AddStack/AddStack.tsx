import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authContext } from '../../contexts/authContext';
import { DevStack, RealStack } from '../../types';
import Stacks from '../../models/stacks';
import { DevInfos } from '../../types';
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
          const response = await fetch('https://api-dev.deverr.fr/stacks/all', {
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
          console.log(e);
        }
      }
      fetchData()
    }
  }, [isLoaded])

  const onSubmit: SubmitHandler<Stacks> = async (data) => {
    const stacksDataRequired = {
      developer_id: auth.user_info.user_id,
      stack_id: Number(data.id),
      stack_experience: 10,
      is_primary: false
    };

    try {
      const response = await fetch(`https://api-dev.deverr.fr/profile/add-stack/${stacksDataRequired.stack_id}`, {
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
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className='dev__stacks'>
        <form id="stacksForm" className="stacks__form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Choisisser une nouvelle Techno</h1>
          <select {...register("id", { required: true })}>
            <option value="">Selectionner une techno</option>
            {filteredStacks.map((stack) => {
              return (
                <option key={stack.id} value={stack.id}>{stack.name}</option>
              )
            })}
          </select>
          {errors.id && <p className="error">Selectionnez une techno !</p>}
          <div className="button__container">
            <button type="submit">
              <span className="span">Ajouter</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStack
