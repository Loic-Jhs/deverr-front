import type { DevInfos } from "../../types";
import { CircularProgress, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/authContext";
import ServicesModal from "../DevDetails/ServicesModal";
import PrestationCard from "../DevDetails/PrestationCard";
import StacksModal from "../DevDetails/StacksModal";
import "./style.scss";
import Button from "../Button/Button";

function DevProfile() {
  //HOOKS
  const { auth } = useContext(authContext);

  //STATES
  const [dev, setDev] = useState<DevInfos>();
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [services, setServices] = useState<Boolean>(false);
  const [isEditable, setIsEditable] = useState<Boolean>(false);

  //MODAL STATES
  const [open, setOpen] = useState(false);
  const [stacksOpen, setStacksOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleStacksOpen = () => setStacksOpen(true);
  const handleStacksClose = () => setStacksOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost/profile/`, {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json",
          Authorization:
            `Bearer ` + auth.access_token
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDev(data);
          setIsLoaded(true);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, [isLoaded, services]);

  const handleEditElement = () => {
    setIsEditable(!isEditable);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (dev) {
      setDev({
        ...dev,
        description: e.target.value,
      });
    }
  };

  const submitDescription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    const response = await fetch(`http://localhost/profile/update`, {
      method: "PUT",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
        Authorization:
          `Bearer ` + auth.access_token
      },
      body: JSON.stringify({ ...dev }),
      mode: "cors",
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  console.log(auth.user_info);

  if (dev) {
    return (
      <>
        <ServicesModal
          open={open}
          onClose={handleClose}
          services={setServices}
        />
        <StacksModal
          open={stacksOpen}
          onClose={handleStacksClose}
          services={services}
          setServices={setServices}
          devStacks={dev.stacks}
        />
        <div className="profile__container">
          <div className="profile__left-part">
            <div className="detail__situation">
              <h3>En quelques mots : </h3>
              {auth.access_token && auth.user_info.user_id === dev.id ? (
                <div className="description__editable">
                  {!isEditable ? (
                    <div>
                      <p className="dev__description">{dev.description}</p>
                      <Button onClick={handleEditElement}> Modifier</Button>
                    </div>
                  ) : (
                    <div className="edit__container">
                      <textarea
                        onChange={handleChangeDescription}
                        value={dev.description}
                      />
                      <Button onClick={submitDescription}> Enregistrer</Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="dev__description">{dev.description}</p>
              )}
              <ul>
                <li>
                  <span>Inscrit depuis le :</span> {dev.registered_at}
                </li>
                <li>
                  <span>Situation :</span> Disponible actuellement
                </li>
                <li>
                  <span>Missions réalisées :</span>{" "}
                  {dev.orders_count != null ? dev.orders_count : "Aucune"}{" "}
                </li>
                <li>
                  <span>Dernière mission :</span>{" "}
                  {dev.last_order_date != null ? dev.last_order_date : "Aucune"}
                </li>
              </ul>
            </div>
            <div className="stacks__section__container">
              <div className="header__stack">
                <p>Compétences maîtrisées :</p>
                {auth.access_token && auth.user_info.user_id === dev.id ? (
                  <Button onClick={handleStacksOpen} >Ajouter</Button>
                ) : (
                  ""
                )}
              </div>
              <div className="dev__stacks">
                {dev.stacks.map((stack) => {
                  return (
                    <div key={stack.id} className="stack__item">
                      <img src={stack.logo} alt={`Logo ${stack.name}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="profile__right-part">
            <div className="dev__info">
              <div className="img__container">
                <img
                  src={dev.avatar}
                  alt={`${dev.firstname} ${dev.lastname} avatar`}
                />
              </div>
              <div className="dev__name-job">
                <h3>
                  {dev.firstname} {dev.lastname}
                </h3>
                <p>Développeur depuis {dev.years_of_experience} ans</p>
              </div>
              <div className="dev__prestations-reviews">
                <h3>
                  {dev.prestations.length > 1
                    ? "Services proposés "
                    : "Service proposé "}
                  :
                </h3>
                <Button onClick={handleOpen}>Ajouter une prestation</Button>
                <div className="dev__prestations-container">
                  {dev.prestations &&
                    dev.prestations.map((prestation) => (
                      <PrestationCard
                        key={prestation.id}
                        prestation={prestation}
                        services={services}
                        setServices={setServices}
                        devProfileId={auth.user_info.user_id}
                      />
                    ))}
                </div>
              </div>
            </div>
              <Button variant="text" size="small">
                Désactiver votre compte
              </Button>
          </div>
        </div>
      </>
    );
  } else {
    return <CircularProgress className="loader" />;
  }
}

export default DevProfile;
