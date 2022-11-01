import { OrderInput, OrderSelect } from "../../models/orderInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DevInfos } from "../../types";
import superagent from "superagent";
import './order.scss';

function Order() {
  const { devID } = useParams();
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<OrderInput & OrderSelect>({ defaultValues: { instruction: "", prestation_id: 0 } });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-dev.deverr.fr/developer/${devID}`, {
          method: "GET",
          headers: {
            "access-control-allow-origin": "*",
            "Content-type": "application/json"
          },
          mode: 'cors'
        });
        const data = await response.json();
        setDev(data[0]);
        setIsLoaded(true);
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [isLoaded]);

  const onSubmit: SubmitHandler<OrderInput & OrderSelect> = (data) => {
    console.log(data);
    // superagent
    // .post('https://api-dev.deverr.fr/order/store')
    // .send(data)
    // .end((err, res) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     setSuccessMessage(res.body.message);
    //   }
    // })
  }

  if (dev) {
    return (
      <>
        <p>Demandez une prestation à {dev.firstname}</p>
        <form id="orderForm" className="order__form" onSubmit={handleSubmit(onSubmit)}>
          <div className='dev__prestations-container'>
            {dev.prestations && dev.prestations.map((prestation) => {
              return (
                <div key={prestation.id} className='dev__prestation-item'>
                  <p>Choisir une prestation</p>
                  <select {...register("prestation_id")} name="prestation_id" defaultValue={0}>
                    <option disabled>Selectionner une prestation</option>
                    <option value={prestation.id}>{prestation.name}</option>
                  </select>
                </div>
              )
            })}
          </div>
          <div className="input__container">
            <textarea className="description"
              {...register("instruction")}
              name="instruction"
              placeholder="Décrivez votre demande..."
            />
            <div className="button__container">
              <button type="submit" className="btn">
                <span className="span">Envoyer la demande</span>
              </button>
            </div>
          </div>

        </form>
      </>
    );
  } else {
    return <CircularProgress className='loader' />
  }
}

export default Order
