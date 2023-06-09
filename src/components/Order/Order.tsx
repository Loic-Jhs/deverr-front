import { OrderInput, OrderSelect, OrderMessage } from "../../models/orderInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import {DevInfos, Prestation} from "../../types";
import './order.scss';

interface modaleProps {
  toggle: () => void;
}

function Order({ toggle }: modaleProps) {
  const { devID } = useParams();
  const { auth } = useContext(authContext);
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<OrderInput & OrderSelect>({ defaultValues: { instruction: "", prestation_id: 0 } });
  const [orderMessage, setOrderMessage] = useState<OrderMessage>({
    status: "",
    message: "",
  });

  useEffect(() => {
    if (orderMessage.status != "") {
      const displayOrderMessage = setTimeout(() => {
        toggle()
        setOrderMessage({ status: "", message: "" });
      }, 3000);
      return () => clearTimeout(displayOrderMessage);
    }
  }, [orderMessage]);

  useEffect(() => {
    (async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/developer/${devID}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
      })
      .then((response) => response.json())
      .then((data) => {
        setDev(data[0]);
        setIsLoaded(true);
      })
      .catch((e) => console.error(e));
    })();
  }, [isLoaded]);

  const onSubmit: SubmitHandler<OrderInput & OrderSelect> = async (data) => {
    const orderDataRequired = {
      user_id: auth.user_info.user_id,
      developer_id: dev?.id,
      developer_prestation_id: Number(data.prestation_id),
      instructions: data.instruction
    }
    await fetch(`${import.meta.env.VITE_API_URL}/order/store`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ` + auth.token,
        },
        body: JSON.stringify(orderDataRequired),
      })
      .then((response) => response.json())
      .then((data) => {
        console.error(data);
      })
      .catch((e) => console.error(e));
  }

  if (dev) {
    return (
      <>
        {
          orderMessage.status == "" ?
            <>
              <p>Demandez une prestation à {dev.firstname}</p>
              <form id="orderForm" className="order__form" onSubmit={handleSubmit(onSubmit)}>
                <div className='dev__prestations-container'>
                  <div className='dev__prestation-item'>
                    <p>Choisir une prestation</p>
                    <select {...register("prestation_id", { required: true })} name="prestation_id">
                      <option value="">Sélectionner une prestation</option>
                      {dev.prestations && dev.prestations.map((prestation: Prestation) => {
                        return (
                          <option key={prestation.id} value={prestation.id}>{prestation.name}</option>
                        )
                      })}
                      {errors.prestation_id && <p>Sélectionnez une prestation !</p>}
                    </select>
                  </div>
                </div>
                <div className="input__container">
                  <textarea className="description"
                    {...register("instruction", { required: true })}
                    name="instruction"
                    placeholder="Décrivez votre demande..."
                  />
                  {errors.instruction && <p>Champ obligatoire !</p>}
                  <div className="button__container">
                    <button type="submit" className="btn">
                      <span className="span">Envoyer la demande</span>
                    </button>
                  </div>
                </div>

              </form>
            </>
            :
            <>
              <h1>{orderMessage.message}</h1>
            </>
        }
      </>
    );
  } else {
    return <CircularProgress className='loader' />
  }
}

export default Order
