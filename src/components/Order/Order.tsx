import { ReactNode, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { DevInfos } from "../../types";
import './order.scss';

function Order() {
  const { devID } = useParams();
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);

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

  if (dev) {
    return (
      <>
        <p>Demandez une prestation à {dev.firstname}</p>
        <form className="order__form">
          <div className='dev__prestations-container'>
            {dev.prestations && dev.prestations.map((prestation) => {
              return (
                <div key={prestation.id} className='dev__prestation-item'>
                  <p>Choisir une prestation</p>
                  <select defaultValue={0}>
                    <option disabled>Selectionner une prestation</option>
                    <option value={prestation.id}>{prestation.name}</option>
                  </select>
                </div>
              )
            })}
          </div>
          <div className="input__container">
            <textarea className="description"
              name="message"
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
