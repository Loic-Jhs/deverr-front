import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { UserInfos } from "../../types";
import "./style.scss";

function ClientProfile() {
  const { auth } = useContext(authContext);
  //   const { userID } = useParams();
  const [client, setClient] = useState<UserInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [isCurrentClient, setIsCurrentClient] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.access_token != undefined) {
      setIsCurrentClient(true);
    }
  }, [auth]);

  useEffect(() => {
    if (isCurrentClient) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost/profile/`, {
            method: "GET",
            headers: {
              "access-control-allow-origin": "*",
              "Content-type": "application/json",
              Authorization:
                `Bearer ` + localStorage.getItem("access_token")?.replaceAll('"', ""),
            },
            mode: "cors",
          });
          const data = await response.json();
          console.error(data);
          setClient(data);
          setIsLoaded(true);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }
  }, [isCurrentClient, isLoaded, auth]);

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
          <div className="client__orders__list">
            {client.orders.map((order, index) => {
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
                    {order.is_accepted_by_developer
                      ? "En attente du développeur"
                      : "Demande traitée"}
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
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <CircularProgress className="loader" />;
  }
}

export default ClientProfile;
