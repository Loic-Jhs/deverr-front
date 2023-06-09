import { CircularProgress } from "@mui/material";
import Button from '../Button/Button';
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import { UserInfos } from "../../types";
import "./style.scss";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

function ClientProfile() {

  const { auth } = useContext(authContext);
  const [client, setClient] = useState<UserInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [isCurrentClient, setIsCurrentClient] = useState<boolean>(false);
  const navigate = useNavigate()


  useEffect(() => {
    if (auth.access_token != undefined && auth.user_info.developer_id == null) {
      setIsCurrentClient(true);
    } else if (auth.access_token != undefined && auth.user_info.developer_id != null) {
      navigate('/dev-profile');
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.access_token) {
      navigate('/');
    }
  }, [auth, navigate]);


  useEffect(() => {
    if (isCurrentClient == true) {
      (async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
              "Content-type": "application/json"
            },
          });
          const data = await response.json();
          setClient(data);
          setIsLoaded(true);
        } catch (e) {
          console.error(e);
        }
      })();
    } 
  }, [isCurrentClient, isLoaded, auth]);

  async function handleCheckout(e : React.ChangeEvent) {
    const stripe = await loadStripe(`${import.meta.env.VITE_PK_STRIPE}`);
    const orderID = e.target.getAttribute('data-order-id');

    await fetch(`${import.meta.env.VITE_API_URL}`+"/order/create-session/" + orderID, {
      method: "POST"
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (session) {
      return stripe?.redirectToCheckout({sessionId: session.id});
    })
    .then(function (result) {
      if (result?.error) {
          alert(result.error.message);
      }
    })
    .catch(function (error) {
        console.error("Error: " + error);
    })
  }

  if (client) {
    return (
      <div className="client__container">
        <h1>Mon profil</h1>
        <div className="client__info">
          <h2>Vos informations :</h2>
          <p>
            {client.firstname} {client.lastname}
          </p>
          <p>Inscrit depuis le {client.registered_at}</p>
          <p>Email : {client.email}</p>
        </div>
        <div className="client__orders__container">
          <h2>Suivi de vos demandes : </h2>
          { client.orders.length > 0 ?
          <div className="client__orders__list">
            {client.orders.map((order: UserInfos['orders'][0], index) => {
              let classToAdd = order.is_finished ? "finished__order" : "";
              return (
                <div key={index} className={`order__item ${classToAdd}`}>
                  <h3>Prestation demandée :</h3>
                  <p>
                    Vous avez demandé la prestation {order.prestation_name} à{" "}
                    {order.developer} le {order.created_at}
                  </p>
                  <h3>Statut de la demande :</h3>
                  <p>
                    {order.is_accepted_by_developer == null
                      ? "En attente du développeur"
                      : order.is_accepted_by_developer != null && order.is_accepted_by_developer == true ? "Demande acceptée" : "Demande refusée"}
                  </p>
                  <h3>Mis à jour le :</h3>
                  <p>
                    {order.updated_at != null
                      ? order.updated_at
                      : "Aucune action effectuée"}
                  </p>
                  <h3>Détail de votre demande :</h3>
                  <p>{order.instructions}</p>
                  {order.is_accepted_by_developer ? (
                    <div>
                      <h3>Statut du projet :</h3>
                      <p>{order.is_finished ? "Terminé" : "En cours"}</p>
                      {order.is_finished == true && order.is_paid == false ? 
                        <Button onClick={handleCheckout} data-order-id={order.id} className="payment__button">Payer la prestation</Button> 
                        : 
                        ""
                      }
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
          :
          <p>Aucune demande pour le moment</p>
        }
        </div>
      </div>
    );
  } else {
    return <CircularProgress className="loader" />;
  }
}

export default ClientProfile;